import React from "react";
import PropTypes from "prop-types";
import Box from "@src/components/UI/Box";

import RadioOption from "./components/RadioOption";
import styles from "./Radio.scss";
import { Label } from "../_common/Label";
import { useRadio } from "./hooks/useRadio";
import {
  Radio as ThemedRadio,
  RadioWrapper as ThemedRadioWrapper,
} from "./components/Themed/Radio";

const Radio = ({
  options,
  label,
  hint,
  className,
  prefixClassName,
  error,
  tooltip,
  disabled,
  value,
  onChange,
  optionKey,
  ...designProps
}) => {
  const [activeIndex, handleChange] = useRadio(
    value,
    onChange,
    options,
    optionKey,
  );

  if (designProps.themed) {
    return (
      <Box flexDirection="column" padding="zero">
        {Boolean(label) && (
          <Label
            hint={hint}
            tooltip={tooltip}
            error={error}
            disabled={disabled}
            className={`${prefixClassName}-label`}
          >
            {label}
          </Label>
        )}
        <ThemedRadioWrapper {...designProps}>
          {options.map((option, i) => (
            <ThemedRadio.Item
              key={i}
              value={option.title}
              selectedValue={options[activeIndex][optionKey]}
              onClick={handleChange(i)}
              {...designProps}
            >
              {option.title}
            </ThemedRadio.Item>
          ))}
        </ThemedRadioWrapper>
      </Box>
    );
  }

  return (
    <div
      data-testid="radio"
      className={`${styles.radio} ${className} ${prefixClassName}`}
    >
      <Label
        hint={hint}
        tooltip={tooltip}
        error={error}
        disabled={disabled}
        className={`${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div className={`${styles.radioOptions} ${prefixClassName}-options`}>
        {options.map((option, i) => {
          return (
            <RadioOption
              key={i}
              value={activeIndex === i}
              onChange={handleChange(i)}
              label={option.title}
              disabled={disabled}
              error={error}
              prefixClassName={`${prefixClassName}-option`}
            />
          );
        })}
      </div>
    </div>
  );
};

Radio.propTypes = {
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
  /** Tooltip showed next to the label */
  tooltip: PropTypes.string,
  /** the key that acts like an identifier for the options  */
  optionKey: PropTypes.string,
  /** the key that acts like an identifier for themed comps.  */
  themed: PropTypes.bool,
  /** the key that acts like an identifier for radio mode - inline|stacked  */
  mode: PropTypes.string,
  /** the key that acts like an identifier for radio item variant - primary|disabled  */
  variant: PropTypes.string,
};

Radio.defaultProps = {
  className: "",
  hint: "",
  value: "",
  label: "",
  error: false,
  onChange: () => {},
  prefixClassName: "",
  options: [],
  disabled: false,
  tooltip: "",
  optionKey: "title",
  themed: false,
  mode: "inline",
  variant: "primary",
};

Radio.classNames = {
  $prefix: "Outermost element",
  "$prefix-label": "Label of the input",
  "$prefix-options": "Div wrapping all the options",
  "$prefix-option": "Div wrapping the option",
  "$prefix-option-box": "Div wrapping the icon",
  "$prefix-option-box-tick": "The icon div inside the box",
  "$prefix-option-text": "The Text of each of the checkbox options",
};

Radio.Item = RadioOption;
Radio.Themed = ThemedRadio;

export default Radio;
