import React, { useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import PropTypes from 'prop-types';
import Context from '@src/components/Context';
import Icon from '@src/components/UI/Icon';
import CrossIcon from '@src/icons/close.svg';

import styles from './ChipsInput.scss';
import { useChips } from './hooks/useChips';

export const ChipsInput = ({
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseDown,
  innerRef,
  value,
  onChange,
  focused,
  error,
  placeholder = 'Type here...',
  inputRef,
  disabled = false,
  onValueChange,
}) => {
  const { primaryColor } = React.useContext(Context);
  const focusedStyle = focused ? { borderColor: primaryColor } : {};
  const errorClassName = error ? styles.error : '';
  const [inputValue, setInputValue] = useState();
  const [onKeyDownChips, , deleteChip] = useChips(
    value,
    inputValue,
    onChange,
    setInputValue,
  );
  const renderChip = (title, i) => {
    return (
      <div key={i} className={styles.chip}>
        {title}
        <Icon
          onClick={() => deleteChip(title)}
          src={CrossIcon}
          className={styles.deleteChipIcon}
        />
      </div>
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onValueChange(value);
  };

  const handleKeyDown = (e) => {
    onKeyDownChips(e);
    onKeyDown(e);
  };

  const renderInput = () => {
    return (
      <AutosizeInput
        ref={inputRef}
        inputClassName={styles.newChip}
        onFocus={onFocus}
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
      style={focusedStyle}
      className={`${styles.chips} ${errorClassName} ${className}-input`}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
    >
      <div className={styles.chipsTrack}>
        {value.map(renderChip)}
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
