import React from "react";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
import useActivify from "@src/hooks/useActivify";
import Context from "@src/components/Context";

import Option from "../Option";
import useKeyboardSelect from "../../hooks/useKeyboardSelect";
import styles from "./Options.scss";

const Options = ({
  options,
  onChange,
  onBlur,
  attachTo,
  focused,
  prefixClassName,
  isReversed,
  className,
}) => {
  const { visible, enabled } = useActivify(focused);
  const { primaryColor } = React.useContext(Context);

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
  const reverseModeClassName = isReversed ? styles.reverse : "";

  /* Dropdown refs useEffect
   * whenever the options change
   * we create n refs where n is the number of options
   * we store these refs in the dropdownDOMs ref
   */
  React.useEffect(() => {
    dropdownDOMs.current = new Array(options.length)
      .fill(0)
      .map(() => React.createRef());
  }, [options.length]);

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

  if (!enabled) return null;

  const rect = attachTo.current.getBoundingClientRect();
  // based on if the dropdown options should show above (isReversed) or below
  // the input, we assign positional properties that will be applied to the outermost
  // options div.
  const position = {
    top: isReversed ? undefined : rect.bottom + window.scrollY,
    bottom: isReversed
      ? window.innerHeight - rect.top - window.scrollY - 1
      : undefined,
    left: rect.left,
    width: rect.width,
  };

  return (
    <Portal>
      <div className={`${styles.dropdownOptionsWrapper}  ${className}`}>
        <div className={styles.dropdownOptionsOverlay} onClick={onBlur} />
        <div
          ref={scrollContainer}
          style={{ ...position, ...focusedStyle }}
          className={`${styles.dropdownOptions} ${activeClassName} ${reverseModeClassName} ${prefixClassName}-options`}
        >
          {options.map((option, i) => {
            return (
              <Option
                key={`${option.label}-${i}`}
                selected={highlightIndex === i}
                innerRef={dropdownDOMs.current[i]}
                onClick={() => onChange(option.value)}
                isZeroState={option.isZeroState}
                isNew={option.isNew}
                className={`${prefixClassName}-option`}
              >
                {option.label}
              </Option>
            );
          })}
        </div>
      </div>
    </Portal>
  );
};

Options.propTypes = {
  prefixClassName: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  isReversed: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  attachTo: PropTypes.shape({
    current: PropTypes.node,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.shape({}),
    }),
  ),
};

Options.defaultProps = {
  prefixClassName: "",
  className: "",
  focused: false,
  isReversed: false,
  onBlur: () => {},
  onChange: () => {},
  options: [],
  attachTo: {},
};

export default Options;
