import React, { useRef, useState } from "react";

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
  className = "",
  prefixClassName = "",
  label = "",
  noOptionsText = "No options present",
  error = "",
  optionKey = "text",
  value = [],
  options = [],
  onChange = () => {},
  placeholder = "",
  createPrefix = "+ Create",

  onFocus = () => {},
  onBlur = () => {},

  disabled = false,
  withSearch = false,
  withCreate = false,
  withMultiple = false,
}) => {
  const [updatedOptions, setUpdatedOptions] = useState(options);
  const valueArray = Array.isArray(value) ? value : [value];
  const _InputDOM = useRef();
  const _InputWrapperDOM = useRef();

  const getInputValue = () => {
    if (withMultiple) return valueArray;
    return valueArray[0] ? valueArray[0][optionKey] : "";
  };

  const [searchTerm, searchResults, handleSearch] = useSearch(updatedOptions, [
    optionKey,
  ]);
  const useDropdownProps = [
    searchTerm,
    searchResults,
    optionKey,
    valueArray,
    withCreate,
    createPrefix,
  ];

  const [dropdownOptions] = useDropdown(...useDropdownProps);
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

    if (withCreate) {
      // cleaning the create prefix if it exists
      const flatNewValue =
        valueToChange[optionKey].indexOf(createPrefix) > -1
          ? valueToChange[optionKey].slice(createPrefix.length + 1)
          : valueToChange[optionKey];

      const flatExistingOptions = updatedOptions.map(option => {
        return option[optionKey];
      });

      // if updatedOptions already has that value, we don't update updatedOptions
      flatExistingOptions.indexOf(flatNewValue) < 0
        ? setUpdatedOptions([...updatedOptions, { text: flatNewValue }])
        : null;
      onChange({ [optionKey]: flatNewValue });
      // removing '+ Create' option added
      dropdownOptions.splice(0, 1);
    } else {
      onChange(newValue);
    }
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
        className={`${prefixClassName}-option`}
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
  const Input = withMultiple ? ChipsInput : TextInput;
  return (
    <div
      className={`${styles.dropdown} ${prefixClassName} ${className}`}
      data-testid="dropdown"
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label ${prefixClassName}-error`}
      >
        {label}
      </Label>
      <Input
        innerRef={_InputWrapperDOM}
        inputRef={_InputDOM}
        className={`${styles.dropdownInput} ${prefixClassName}-input ${prefixClassName}-error ${reverseModeClassName}`}
        prefixClassName={`${prefixClassName}-input`}
        error={error}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleToggle}
        onChange={withMultiple ? onChange : handleSearch}
        focused={focused}
        active={focused}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        editable={withSearch || withCreate}
        withMultiple={withMultiple}
        postfixComponent={
          <Icon className={styles.dropdownInputIcon} src={AngleDownIcon} />
        }
        optionKey={optionKey}
      />
      <DropdownOptions
        // onClose={handleBlur}
        attachTo={_InputWrapperDOM}
        active={focused}
        focused={focused}
        className={`${prefixClassName}-options`}
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
  /** Text to prefix for Creating a new option */
  createPrefix: PropTypes.string,

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
  /**  Whether the input is disabled or not */
  disabled: PropTypes.bool,
};

Dropdown.classNames = {
  $prefix: "Prefix ClassName",
  "$prefix-label": "Prefix ClassName applied to the Label",
  "$prefix-input": "Prefix ClassName applied to the input element",
  "$prefix-error": "Prefix ClassName applied in case of error",
  "$prefix-options": "Prefix ClassName applied to the options container",
  "$prefix-option": "Prefix ClassName applied to the individual option",
};

export default Dropdown;
