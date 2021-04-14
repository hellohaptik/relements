import React from "react";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import useActivify from "@src/hooks/useActivify";
import Context from "@src/components/Context";
import Checkbox from "@src/components/Inputs/Checkbox";
import Text from "@src/components/Inputs/Text";
import Icon from "@src/components/UI/Icon";
import SearchIcon from "@src/icons/search.svg";

import Option from "../Option";
import useKeyboardSelect from "../../hooks/useKeyboardSelect";

import {
  DropdownOptionsWrapper,
  DropdownOptionsOverlay,
  DropdownOptions,
  DropdownCheckboxWrapper,
  DropdownCheckboxSearchWrapper,
  DropdownCheckboxOptionsWrapper,
  DropdownCheckboxSearchIcon,
} from "../../ThemedDropdown";

import styles from "./Options.scss";

const Options = ({
  options,
  onChange,
  onBlur,
  attachTo,
  focused,
  inputRef,
  prefixClassName,
  isSearchFocused,
  handleOnSearchFocus,
  handleOnSearchBlur,
  handleSearchText,
  isReversed,
  withCheckbox,
  withMultiple,
  withSearch,
  onMouseEnter,
  onMouseLeave,
  className,
  themed,
  noOptionsText,
}) => {
  const { visible, enabled } = useActivify(focused);
  const { primaryColor } = React.useContext(Context);
  const [dropdownContainerRect, setDropdownContainerRect] = React.useState(0);

  // A ref to store all the DOM elements for all the options
  const dropdownDOMs = React.useRef();

  // A ref for the options container (the scroll window)
  const scrollContainer = React.useRef();

  // Handles all keyboard selection (up/down/escape/enter)
  // returns the currently selected index
  // (the index of the option that needs to be highlighted)
  const highlightIndex = useKeyboardSelect({
    options,
    attachTo,
    onEnter: onChange,
    onEscape: onBlur,
    // only enabled when the options are actually visible
    enabled: visible,
  });

  const activeClassName = visible ? styles.active : "";
  const focusedStyle = focused ? { borderColor: primaryColor } : {};
  const focusedSearchStyle = isSearchFocused
    ? { borderColor: primaryColor }
    : {};
  const reverseModeClassName = isReversed ? styles.reverse : "";

  // Calculates Rect dimensions of attachTo Ref
  const calcRect = () => {
    const rect = attachTo.current && attachTo.current.getBoundingClientRect();
    setDropdownContainerRect(rect);
  };

  /* Dropdown refs useEffect
   * whenever the options change
   * we create n refs where n is the number of options
   * we store these refs in the dropdownDOMs ref
   */
  React.useEffect(() => {
    dropdownDOMs.current = new Array(options.length)
      .fill(0)
      .map(() => React.createRef());

    // Refresh the rect dimensions whenever there are changes in options
    calcRect();
  }, [options.length, options, highlightIndex, attachTo.current]);

  /* Dropdown options scrollIntoView useEffect
   * whenever the highlightIndex changes
   * if the new option is not visible in the options window
   * we scroll to the new option to ensure visibility
   * it tries to mimic how native dropdowns on the web work
   */
  React.useEffect(() => {
    const optionDOMS = dropdownDOMs.current || [];
    const activeOptionDOM = (optionDOMS[highlightIndex] || {}).current;
    const containerDOM = scrollContainer.current;

    if (!activeOptionDOM || !containerDOM) return;

    const containerHeight = containerDOM.getBoundingClientRect().height;
    const scrollStartPoint = containerDOM.scrollTop;
    const scrollEndPoint = scrollStartPoint + containerHeight;
    const elemOffset = activeOptionDOM.offsetTop;
    const elemHeight = activeOptionDOM.getBoundingClientRect().height;

    if (elemOffset + elemHeight > scrollEndPoint) {
      // if the element is past the visible point
      // then we scroll the dropdown just enouogh so that the element
      // is visible at the bottom of the dropdown
      containerDOM.scrollTop = elemOffset - containerHeight + elemHeight;
    } else if (elemOffset - elemHeight < scrollStartPoint) {
      // if the element is before the visible point
      // then we scroll the dropdown just enouogh so that the element
      // is visible at the top of the dropdown
      containerDOM.scrollTop = elemOffset;
    }
  }, [highlightIndex]);

  const handleScroll = () => {
    // Refresh the rect dimensions whenever user scrolls the page
    calcRect();
  };

  React.useEffect(() => {
    if (themed && focused) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [themed, focused]);

  if (!enabled) return null;

  const getPosition = () => {
    return {
      top: isReversed
        ? undefined
        : dropdownContainerRect.bottom + window.scrollY,
      bottom: isReversed
        ? window.innerHeight - dropdownContainerRect.top - window.scrollY - 1
        : undefined,
      left: dropdownContainerRect.left,
      width: dropdownContainerRect.width,
    };
  };

  // based on if the dropdown options should show above (isReversed) or below
  // the input, we assign positional properties that will be applied to the outermost
  // options div.
  const position = getPosition();

  let checkboxWrapperVariant;

  if (focused) {
    if (isReversed) {
      checkboxWrapperVariant = "dropdownActiveTop";
    } else {
      checkboxWrapperVariant = "dropdownActive";
    }
  }

  const renderWithCheckbox = () => {
    if (themed) {
      return (
        <DropdownCheckboxWrapper
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant={checkboxWrapperVariant}
        >
          <DropdownCheckboxSearchWrapper
            mode={withSearch ? "withSearch" : "withoutSearch"}
          >
            <DropdownCheckboxSearchIcon>
              <Icon src={SearchIcon} />
            </DropdownCheckboxSearchIcon>
            <Text
              themed
              innerRef={inputRef}
              placeholder="Search here"
              onChange={handleSearchText}
              onFocus={handleOnSearchFocus}
              onBlur={handleOnSearchBlur}
              style={{
                paddingLeft: 36,
              }}
            />
          </DropdownCheckboxSearchWrapper>

          <DropdownCheckboxOptionsWrapper
            mode={withSearch ? "default" : "withoutSearch"}
          >
            {options.map((option, i) => {
              if (option.isZeroState) {
                return (
                  <Option
                    key={`themed-${option.label}-${i}`}
                    selected={highlightIndex === i}
                    innerRef={dropdownDOMs.current[i]}
                    isZeroState={option.isZeroState}
                    themed={true}
                    noOptionsText={noOptionsText}
                    checkboxSearch
                  >
                    {option.label}
                  </Option>
                );
              }
              // TODO: Add "create mode" as and when required
              return (
                <Checkbox.Item
                  key={`themed-${option.label}-${i}`}
                  label={option.label}
                  value={option.isSelected}
                  onChange={() => {
                    onChange(option.value);
                  }}
                  className={`${styles.checkboxOptionsOption} ${prefixClassName}-option`}
                />
              );
            })}
          </DropdownCheckboxOptionsWrapper>
        </DropdownCheckboxWrapper>
      );
    }

    return (
      <div
        className={styles.checkboxOptions}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`${styles.checkboxOptionsSearchWrapper}  ${!withSearch &&
            styles.noBorder}`}
          style={{ borderColor: focused ? primaryColor : undefined }}
        >
          <Icon
            src={SearchIcon}
            className={`${
              styles.checkboxOptionsSearchIcon
            } ${prefixClassName}-icon  ${!withSearch && styles.noDisplay}`}
          />
          <input
            ref={inputRef}
            className={`${styles.checkboxOptionsSearch} ${!withSearch &&
              styles.hidden}`}
            style={focusedSearchStyle}
            placeholder="Search here"
            onChange={e => handleSearchText(e.target.value)}
            onFocus={handleOnSearchFocus}
            onBlur={handleOnSearchBlur}
          />
        </div>
        <div className={styles.checkboxOptionsWrapper}>
          {options.map((option, i) => {
            if (option.isZeroState) {
              return (
                <Option
                  key={`${option.label}-${i}`}
                  selected={highlightIndex === i}
                  innerRef={dropdownDOMs.current[i]}
                  isZeroState={option.isZeroState}
                  className={`${prefixClassName}-option ${styles.checkboxOptionsWrapperZeroState}`}
                >
                  {option.label}
                </Option>
              );
            }
            // TODO: Add "create mode" as and when required
            return (
              <Checkbox.Item
                key={`${option.label}-${i}`}
                label={option.label}
                value={option.isSelected}
                onChange={() => {
                  onChange(option.value);
                }}
                className={`${styles.checkboxOptionsOption} ${prefixClassName}-option`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderOptionsInner = () => {
    if (withCheckbox && withMultiple) {
      return renderWithCheckbox();
    }

    return (
      <>
        {options.map((option, i) => {
          return (
            <Option
              key={`${option.label}-${i}`}
              selected={highlightIndex === i}
              innerRef={dropdownDOMs.current[i]}
              onClick={() => {
                onChange(option.value);
              }}
              isZeroState={option.isZeroState}
              isNew={option.isNew}
              className={`${prefixClassName}-option`}
              themed={themed}
              noOptionsText={noOptionsText}
            >
              {option.label}
            </Option>
          );
        })}
      </>
    );
  };

  const renderOptions = () => {
    if (themed) {
      const mode = visible ? "active" : "inactive";

      return (
        <DropdownOptionsWrapper>
          <DropdownOptionsOverlay />
          <DropdownOptions
            ref={scrollContainer}
            style={{ ...position }}
            onBlur={onBlur}
            mode={mode}
            variant={withCheckbox ? "withCheckbox" : "default"}
            positionVariant={isReversed ? "top" : "default"}
          >
            {renderOptionsInner()}
          </DropdownOptions>
        </DropdownOptionsWrapper>
      );
    }

    return (
      <div className={`${styles.dropdownOptionsWrapper}  ${className}`}>
        <div className={styles.dropdownOptionsOverlay} />
        <div
          ref={scrollContainer}
          style={{ ...position, ...focusedStyle }}
          className={`${styles.dropdownOptions} ${activeClassName} ${reverseModeClassName} ${prefixClassName}-options`}
          onBlur={onBlur}
        >
          {renderOptionsInner()}
        </div>
      </div>
    );
  };

  return <Portal>{renderOptions()}</Portal>;
};

Options.propTypes = {
  prefixClassName: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  isReversed: PropTypes.bool,
  withCheckbox: PropTypes.bool,
  withMultiple: PropTypes.bool,
  withSearch: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  inputRef: PropTypes.shape({}),
  attachTo: PropTypes.shape({
    current: PropTypes.node,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.shape({}),
    }),
  ),
  isSearchFocused: PropTypes.bool,
  handleOnSearchFocus: PropTypes.func,
  handleOnSearchBlur: PropTypes.func,
  handleSearchText: PropTypes.func,
  themed: PropTypes.bool,
  noOptionsText: PropTypes.string,
};

Options.defaultProps = {
  prefixClassName: "",
  className: "",
  focused: false,
  isReversed: false,
  withCheckbox: false,
  withMultiple: false,
  isSearchFocused: false,
  withSearch: false,
  onBlur: () => {},
  onChange: () => {},
  handleOnSearchFocus: () => {},
  handleOnSearchBlur: () => {},
  handleSearchText: () => {},
  options: [],
  attachTo: {},
  themed: false,
  noOptionsText: "",
};

export default Options;
