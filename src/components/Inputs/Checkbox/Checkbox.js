import React from "react";
import PropTypes from "prop-types";

import CheckboxOption from "./components/CheckboxOption";
import styles from "./Checkbox.scss";
import { Label } from "../_common/Label";
import { useCheckbox } from "./hooks/useCheckbox";

const Checkbox = ({
  value,
  onChange,
  options,
  label,
  hint,
  disabled,
  className,
  prefixClassName,
  error,
}) => {
  const [activeIndexes, handleChange] = useCheckbox(value, onChange, options);
  return (
    <div
      data-testid="checkbox"
      className={`${styles.checkbox} ${className} ${prefixClassName}`}
    >
      <Label
        hint={hint}
        disabled={disabled}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div className={`${styles.checkboxOptions} ${prefixClassName}-options`}>
        {options.map((option, i) => {
          return (
            <CheckboxOption
              value={activeIndexes.includes(i)}
              onChange={handleChange(i)}
              label={option.title}
              error={error}
              disabled={disabled}
              prefixClassName={`${prefixClassName}-option`}
            />
          );
        })}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The hint text that shows up below the label */
  hint: PropTypes.string,
  /** The value of the input */
  value: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** If the input has an error. */
  error: PropTypes.bool,
  /** onChange callback */
  onChange: PropTypes.func,
  /** The prefix classname appended to all elements */
  prefixClassName: PropTypes.string,
  /** Array of options (checkboxes) */
  options: PropTypes.array,
  /** If the input is disabled (non-editable) */
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: "",
  hint: "",
  value: "",
  label: "",
  error: false,
  onChange: () => {},
  prefixClassName: "",
  options: [],
  disabled: false,
};

Checkbox.classNames = {
  $prefix: "Outermost element",
  "$prefix-label": "Label of the input",
  "$prefix-options": "Div wrapping all the options",
  "$prefix-option": "Div wrapping the option",
  "$prefix-option-box": "Div wrapping the icon",
  "$prefix-option-box-tick": "The icon div inside the box",
  "$prefix-option-text": "The Text of each of the checkbox options",
};

Checkbox.Item = CheckboxOption;

export default Checkbox;
