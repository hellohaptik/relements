/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

import Icon from "@src/components/UI/Icon";
import AngleDownIcon from "@src/icons/angle-down.svg";
import { TextInput } from "@src/components/Inputs/_common/TextInput";
import { ChipsInput } from "@src/components/Inputs/_common/ChipsInput";

import styles from "./Input.scss";

const Input = ({
  withMultiple,
  withSearch,
  value,
  onChange,
  text,
  onTextChange,
  innerRef,
  inputRef,
  focused,
  isReversed,
  placeholder,
  optionKey,
  prefixClassName,
  disabled,
}) => {
  const focusedClassName = focused ? styles.focused : "";
  const reversedClassName = isReversed ? styles.reversed : "";
  const className = `${styles.input} ${focusedClassName} ${reversedClassName}`;
  const postfixComponent = (
    <Icon className={`${prefixClassName}-icon`} src={AngleDownIcon} />
  );
  const commonProps = {
    innerRef,
    inputRef,
    focused,
    placeholder,
    className,
    prefixClassName,
    postfixComponent,
    disabled,
  };

  // if multiple selection is allowed, then we use the chips input
  // which deals with multiple item selections (arrays)
  if (withMultiple) {
    return (
      <ChipsInput
        value={value}
        typeValue={text}
        onChange={onChange}
        onType={onTextChange}
        optionKey={optionKey}
        {...commonProps}
      />
    );
  }

  // if search is allowed, then we return an editable text input
  if (withSearch) {
    return (
      <TextInput
        editable={true}
        value={text}
        onChange={onTextChange}
        {...commonProps}
      />
    );
  }

  // otherwise we still return a text input
  // however editing is disabled
  return (
    <TextInput
      editable={false}
      value={value[0][optionKey]}
      onChange={onTextChange}
      {...commonProps}
    />
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  innerRef: PropTypes.shape({}),
  inputRef: PropTypes.shape({}),
  isReversed: PropTypes.bool,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  optionKey: PropTypes.string,
  placeholder: PropTypes.string,
  prefixClassName: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.shape({})),
  withMultiple: PropTypes.bool,
  withSearch: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
  focused: false,
  isReversed: false,
  withMultiple: false,
  withSearch: false,
  onChange: () => {},
  onTextChange: () => {},
  optionKey: "",
  placeholder: "",
  prefixClassName: "",
  text: "",
};

export default Input;
