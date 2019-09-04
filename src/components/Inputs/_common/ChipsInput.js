import React, { useState } from "react";
import AutosizeInput from "react-input-autosize";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import CrossIcon from "icons/close.svg";
import styles from "./ChipsInput.scss";
import { useChips } from "./hooks/useChips";

export const ChipsInput = ({
  className,
  onKeyDown = () => {},
  onFocus,
  onBlur,
  onMouseDown,
  innerRef,
  value,
  onChange,
  focused,
  error,
  placeholder = "Type here...",
  inputRef,
  disabled = false,
  onValueChange = () => {},
}) => {
  const focusedClassName = focused ? styles.focused : "";
  const errorClassName = error ? styles.error : "";
  const [inputValue, setInputValue] = useState();
  const [onKeyDownChips, , deleteChip] = useChips(
    value,
    inputValue,
    onChange,
    setInputValue,
  );
  const renderChip = (title, i) => {
    return (
      <div key={i} className={`${styles.chip} chip`}>
        {title}
        <Icon
          onClick={() => deleteChip(title)}
          src={CrossIcon}
          className={`${styles.deleteChipIcon} deleteChip`}
        />
      </div>
    );
  };

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
    onValueChange(value);
  };

  const handleKeyDown = e => {
    onKeyDownChips(e);
    onKeyDown(e);
  };

  const renderInput = () => {
    return (
      <AutosizeInput
        ref={inputRef}
        inputClassName={styles.newChip}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div
      onClick={onFocus}
      ref={innerRef}
      className={`${styles.chips} ${focusedClassName} ${errorClassName} ${className}`}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
    >
      <div className={styles.chipsTrack}>
        {value.length > 0 ? value.map(renderChip) : null}
        {!disabled ? renderInput() : null}
      </div>
    </div>
  );
};

ChipsInput.propTypes = {
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseDown: PropTypes.func,
  innerRef: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  inputRef: PropTypes.object,
};
