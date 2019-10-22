import React, { useState } from "react";
import AutosizeInput from "react-input-autosize";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import Icon from "@src/components/UI/Icon";
import CrossIcon from "@src/icons/close.svg";

import styles from "./ChipsInput.scss";
import { useChips } from "./hooks/useChips";

export const ChipsInput = ({
  className = "",
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onMouseDown = () => {},
  innerRef = React.createRef(),
  value = [],
  onChange = () => {},
  focused = false,
  error = "",
  placeholder = "Type here...",
  inputRef,
  disabled = false,
  onType = () => {},
  prefixComponent = null,
  postfixComponent = null,
  optionKey = "text",
  prefixClassName = "",
}) => {
  const { primaryColor } = React.useContext(Context);
  const focusedClassNameString = focused ? "focused" : "";
  const focusedStyle = focused ? { borderColor: primaryColor } : {};
  const errorClassName = error ? styles.error : "";
  const [inputValue, setInputValue] = useState();
  const [onKeyDownChips, , deleteChip] = useChips(
    value,
    inputValue,
    onChange,
    setInputValue,
  );

  const handleDelete = React.useCallback(i => e => {
    e.stopPropagation();
    e.preventDefault();
    deleteChip(i);
  });

  const handleChange = React.useCallback(e => {
    const value = e.target.value;
    setInputValue(value);
    onType(value);
  });

  const handleKeyDown = React.useCallback(e => {
    onKeyDownChips(e);
    onKeyDown(e);
  });

  const renderInput = () => {
    return (
      <AutosizeInput
        ref={inputRef}
        inputClassName={`${styles.newChip} ${prefixClassName}-input`}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholder}
      />
    );
  };

  const renderChip = (chip, i) => {
    const title = typeof chip === "object" ? chip[optionKey] : chip;
    return (
      <div key={i} className={`${styles.chip} ${prefixClassName}-chip`}>
        {title}
        <div
          className={`${prefixClassName}-chip-icon`}
          onMouseDown={handleDelete(i)}
        >
          <Icon
            src={CrossIcon}
            className={`${styles.deleteChipIcon} ${prefixClassName}-chip-icon-svg`}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      tabIndex="-1"
      ref={innerRef}
      style={focusedStyle}
      className={`${styles.chips} ${prefixClassName} ${errorClassName} ${className} ${focusedClassNameString}`}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
    >
      {prefixComponent}
      <div className={`${styles.chipsTrack} ${prefixClassName}-chips`}>
        {value.length > 0 ? value.map(renderChip) : null}
        {!disabled ? renderInput() : null}
      </div>
      {postfixComponent}
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
  onType: PropTypes.func,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  optionKey: PropTypes.string,
  inputRef: PropTypes.object,
  prefixComponent: PropTypes.node,
  postfixComponent: PropTypes.node,
  prefixClassName: PropTypes.string,
};
