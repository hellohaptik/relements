import React, { useRef } from "react";

import PropTypes from "prop-types";

import Icon from "components/UI/Icon";
import AngleDownIcon from "icons/angle-down.svg";

import DropdownOptions from "./components/DropdownOptions";
import DropdownOption from "./components/DropdownOption";

import { TextInput } from "../_common/TextInput";
import { Label } from "../_common/Label";

import { useKeyboardSelect } from "./hooks/useKeyboardSelect";
import { useSearch } from "./hooks/useSearch";
import { useDropdown } from "./hooks/useDropdown";

import styles from "./Dropdown.scss";
import { ChipsInput } from "../_common/ChipsInput";
import { useInput } from "../_common/hooks/useInput";

const Dropdown = ({
  className,
  prefixClassName,
  label,
  noOptionsText,
  error,
  optionKey = "text",
  value = [],
  options,
  onChange,
  placeholder,

  onFocus,
  onBlur,

  withSearch = false,
  withCreate = false,
  withMultiple = false,
}) => {
  const disabled = withMultiple || withSearch ? true : false;
  const valueArray = Array.isArray(value) ? value : [value];
  const _InputDOM = useRef();
  const _InputWrapperDOM = useRef();

  const [searchTerm, searchResults, handleSearch] = useSearch(options, [
    optionKey,
  ]);
  const useDropdownProps = [
    searchTerm,
    searchResults,
    optionKey,
    valueArray,
    withCreate,
  ];

  const getInputValue = () => {
    if (withMultiple) {
      return valueArray.map(value => value[optionKey]);
    }
    return valueArray[0] ? valueArray[0][optionKey] : "";
  };

  const [dropdownOptions] = useDropdown(...useDropdownProps);
  console.log(dropdownOptions);
  const [
    highlightIndex,
    handleKeyDown,
    _DropdownOptionDOMs,
  ] = useKeyboardSelect(dropdownOptions, onChange);
  const { focused, setFocused, handleFocus, handleBlur } = useInput(
    _InputDOM,
    onFocus,
    onBlur,
  );

  const handleToggle = () => setFocused(!focused);

  const isReversed =
    _InputWrapperDOM.current &&
    _InputWrapperDOM.current.getBoundingClientRect().bottom + 64 >
      window.innerHeight;

  const handleChange = valueToChange => {
    const newValue = withMultiple ? [...value, valueToChange] : valueToChange;
    onChange(newValue);
  };

  const handleChipDelete = valueToChange => {
    const newValue = valueToChange.map(value => {
      return { text: value };
    });
    onChange(newValue);
  };

  const renderOptions = () => {
    if (!dropdownOptions.length) {
      return (
        <span className={styles.dropdownInputZeroState}>
          {noOptionsText || "No options present"}
        </span>
      );
    }

    return dropdownOptions.map((option, i) => (
      <DropdownOption
        key={i}
        innerRef={_DropdownOptionDOMs.current[i]}
        selected={i === highlightIndex}
        onClick={handleChange}
        value={option}
      >
        {option[optionKey]}
      </DropdownOption>
    ));
  };

  const reverseModeClassName = isReversed ? styles.reverse : "";
  const inputValue = getInputValue();
  console.log(inputValue);
  const Input = withMultiple ? ChipsInput : TextInput;
  return (
    <div className={`${styles.dropdown} ${prefixClassName} ${className}`}>
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <Input
        innerRef={_InputWrapperDOM}
        inputRef={_InputDOM}
        className={`${styles.dropdownInput} ${reverseModeClassName}`}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleToggle}
        onChange={withMultiple ? handleChipDelete : handleSearch}
        handleChipDelete={handleChipDelete}
        focused={focused}
        active={focused}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        withMultiple={withMultiple}
        postfixComponent={<Icon src={AngleDownIcon} />}
      />
      <DropdownOptions
        onClose={handleBlur}
        attachTo={_InputWrapperDOM}
        active={focused}
        focused={focused}
        prefixClassName={`${prefixClassName}-options`}
        reverseMode={isReversed}
      >
        {renderOptions()}
      </DropdownOptions>
    </div>
  );
};

Dropdown.propTypes = {
  /** Placeholder Text for the Dropdown */
  placeholder: PropTypes.string,
  /** ClassName for the Dropdown element */
  className: PropTypes.string,
  /** Value of the Dropdown Input */
  value: PropTypes.string,
  /** Label for the Dropdown */
  label: PropTypes.string,
  /** Text to be shown if there are no options */
  noOptionsText: PropTypes.string,
  /** Error for Dropdown */
  error: PropTypes.string,
  /** Key to sort for option */
  optionKey: PropTypes.string,
  /** onChange Callback */
  onChange: PropTypes.func,
  /** Options for The Dropdown */
  options: PropTypes.array,
  /** PrefixClassName for The Dropdown */
  prefixClassName: PropTypes.string,

  /** onFocus Callback */
  onFocus: PropTypes.func,
  /** onBlur Callback */
  onBlur: PropTypes.func,

  /** Dropdown with Search Enabled */
  withSearch: PropTypes.bool,
  /**  Dropdown with Creating new Options Enabled */
  withCreate: PropTypes.bool,
  /**  Dropdown with Multiple Inputs Enabled */
  withMultiple: PropTypes.bool,
};

export default Dropdown;
