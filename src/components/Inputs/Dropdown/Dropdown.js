import React from "react";
import PropTypes from "prop-types";

import { Label } from "../_common/Label";
import { useSearch } from "./hooks/useSearch";

import styles from "./Dropdown.scss";
import Options from "./components/Options";
import Input from "./components/Input";
import getOptions from "./utils/getOptions";

const Dropdown = ({
  className,
  prefixClassName,
  label,
  noOptionsText,
  error,
  optionKey,
  value,
  options: propOptions,
  onChange,
  placeholder,
  createPrefix,
  searchKeys,
  onFocus,
  onBlur,
  disabled,
  withSearch,
  withCreate,
  withMultiple,
}) => {
  // stores the currently typed input (in case of withSearch)
  const [text, setText] = React.useState("");
  const [options, setOptions] = React.useState(propOptions);

  // updates initial set of options, whenever propOptions changes
  // because on re-render, useState for options doesn't get called, which results in
  // options always using the old value of propOptions.
  React.useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  const [createdOption, setCreatedOption] = React.useState();
  const [focused, setFocused] = React.useState(false);

  // simple mode is when the options are an array of strings instead of objects
  // and the value and onChange also expect strings.
  const isSimpleInputMode = typeof value === "string";
  const isSimpleOptionsMode =
    options.length && typeof propOptions[0] === "string";

  // the ref for the input wrapper (used for positioning the dropdown)
  const inputWrapperRef = React.useRef();

  // the ref for blur lock (whether to lock the blur event or not)
  const blurCount = React.useRef(false);

  // the ref for the actual input itself (used for focus/blur of input)
  const inputRef = React.useRef();

  // the ref for the clear timeout
  // [when the typeable input clears]
  const timeoutRef = React.useRef();

  let inputValue = "";
  // if the value is a simple string, convert it to an object
  inputValue = isSimpleInputMode ? { [optionKey]: value } : value;
  // we normalize it to always be an array of objects depending on the useMultiple flag
  inputValue = withMultiple ? inputValue : [inputValue];

  const firstValueLabel = inputValue[0] ? inputValue[0][optionKey] || "" : "";

  // based on the typed text, the options are filtered using the useSearch hook
  // Fuse.js is used for fuzzy searching.
  // searchText is set to empty (show all results if a valid value is already selected)
  // searchKeys determines the array of keys withing the options to search
  const searchInKeys = searchKeys.length ? searchKeys : [optionKey];
  const searchText = text === firstValueLabel ? "" : text;
  const searchResults = useSearch(searchText, options, searchInKeys);

  // we need to normalize the options for display.
  // - It filters out the option that was selected
  // - Injects the zero state in case there are no options
  // - Injects the withCreate option in case creation is allowed
  const dropdownOptions = getOptions({
    options: withSearch || withMultiple ? searchResults : options,
    optionKey,
    noOptionsText,
    withCreate,
    createPrefix,
    text,
    value: inputValue,
  });

  // To determine whether the dropdown options container opens above the dropdown
  // or below.
  // The 200 is the max height of the dropdown. (To account for some space for the dropdown to open)
  const isReversed =
    inputWrapperRef.current &&
    inputWrapperRef.current.getBoundingClientRect().bottom + 200 >
      window.innerHeight;

  // on blurring we clear + blur the input
  const handleBlur = e => {
    if (disabled) return;
    setFocused(false);
    onBlur(e);
    if (inputRef.current) inputRef.current.blur();

    // increment the blur count
    blurCount.current += 1;

    const target = e.target;
    // we set a timeout to give the component enough time to dispatch both the events.
    // once both the events fire, we can ignore the second one. (when blurCount is 2)
    // otherwise it will reset the text to the old value.
    // 200 is a sufficiently high value
    // the delay is non-consequential as it's only there when the input resets
    setTimeout(() => {
      if (text !== firstValueLabel && target && blurCount.current === 1) {
        const optionIndex = dropdownOptions
          .map(option => option.label)
          .indexOf(text);

        if (withMultiple) setText("");
        else if (optionIndex > -1) onChange(dropdownOptions[optionIndex].value);
        else setText(firstValueLabel);
      }
    }, 200);
  };

  const handleFocus = e => {
    if (disabled) return;
    setFocused(true);
    onFocus(e);

    // blur count keeps track of how many times the blur event was called
    // this is to ensure that the when the user clicks on the option
    // we can ignore the duplicate blur event
    blurCount.current = 0;

    // sometimes the input isn't immediately available
    // only available on the next tick (hence the timeout is 0)
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    clearTimeout(timeoutRef.current);
  };

  const handleChange = e => {
    // if it's simple mode, then we return a string value
    onChange(isSimpleOptionsMode ? e[optionKey] : e);
    // we don't blur if multiple options can be selected
    // this is a UX decision.
    if (!withMultiple) handleBlur(e);
    else setText("");

    // if we allow creation and the new option selected
    // is a new option (does not exist in the options list)
    // then we set the temp option to store the new option so that it's there in the
    // dropdown
    if (
      withCreate &&
      !dropdownOptions.map(option => option.label).includes(e[optionKey])
    ) {
      setCreatedOption(e);
    }
  };

  const handleOptionClick = e => {
    // based on if multiple selection is allowed
    // then we append the new option to the existing value array
    // otherwise we return the value as is
    const newValue = withMultiple ? [...inputValue, e] : e;
    handleChange(newValue);
  };

  React.useEffect(() => {
    // we also support an array of strings instead of objects
    // we normalize it to objects with the default optionKey
    // [simple mode]
    let listOfOptionObjects = propOptions;
    if (isSimpleOptionsMode) {
      listOfOptionObjects = propOptions.map(option => ({
        [optionKey]: option,
      }));
    }

    // merged options contains the extra created option if available
    const mergedOptions =
      createdOption && withCreate
        ? [createdOption, ...listOfOptionObjects]
        : listOfOptionObjects;

    setOptions(mergedOptions);
  }, [propOptions.length, createdOption]);

  React.useEffect(() => {
    // we set the search text for single selection
    // items to the selected value. This is so that
    // the input text shows the selected value
    if (withMultiple) return;
    setText(firstValueLabel || "");
  }, [firstValueLabel]);

  return (
    <div
      className={`${styles.dropdown} ${prefixClassName} ${className}`}
      data-testid="dropdown"
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label ${prefixClassName}-error`}
      >
        {label}
      </Label>
      <Input
        innerRef={inputWrapperRef}
        inputRef={inputRef}
        value={inputValue}
        text={text}
        onTextChange={setText}
        onChange={handleChange}
        isReversed={isReversed}
        focused={focused}
        placeholder={placeholder}
        withSearch={withSearch}
        withMultiple={withMultiple}
        optionKey={optionKey}
        disabled={disabled}
        prefixClassName={`${prefixClassName}-input`}
      />
      <Options
        attachTo={inputWrapperRef}
        focused={focused}
        options={dropdownOptions}
        onChange={handleOptionClick}
        isReversed={isReversed}
        onBlur={handleBlur}
        prefixClassName={prefixClassName}
      />
    </div>
  );
};

Dropdown.propTypes = {
  /** Placeholder Text for the Dropdown */
  placeholder: PropTypes.string,
  /** ClassName for the Dropdown element */
  className: PropTypes.string,
  /** Value of the Dropdown Input */
  value: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
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
  /**  Keys in the options to search for when using withSearch */
  searchKeys: PropTypes.arrayOf(PropTypes.string),
};

Dropdown.defaultProps = {
  className: "",
  prefixClassName: "",
  label: "",
  noOptionsText: "No options present",
  error: "",
  optionKey: "text",
  value: [],
  options: [],
  onChange: () => {},
  placeholder: "",
  createPrefix: "+ Create",
  searchKeys: [],
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  withSearch: false,
  withCreate: false,
  withMultiple: false,
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
