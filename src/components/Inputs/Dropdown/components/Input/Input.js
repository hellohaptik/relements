/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

import Icon from "@src/components/UI/Icon";
import AngleDownIcon from "@src/icons/angle-down.svg";
import { TextInput } from "@src/components/Inputs/_common/TextInput";
import { ChipsInput } from "@src/components/Inputs/_common/ChipsInput";
import Tooltip from "@src/components/Overlays/Tooltip";
import WithTooltip from "@src/components/Overlays/WithTooltip";

import { DropdownArrow, DropdownIcon } from "../../ThemedDropdown";

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
  tooltip,
  prefixClassName,
  disabled,
  themed,
  icon,
}) => {
  const focusedClassName = focused ? styles.focused : "";
  const reversedClassName = isReversed ? styles.reversed : "";
  const className = `${styles.input} ${focusedClassName} ${reversedClassName}`;
  const dropdownClassName = `${themed && styles.dropdownIcon} ${themed &&
    focused &&
    styles.dropdownIconActive}`;

  const postfixComponent = tooltip ? (
    <WithTooltip
      className={`${prefixClassName}-tooltip`}
      tooltip={tooltip}
      position="BOTTOM"
    >
      <Icon className={`${prefixClassName}-icon`} src={AngleDownIcon} />
    </WithTooltip>
  ) : (
    <Icon
      className={`${prefixClassName}-icon ${dropdownClassName}`}
      src={AngleDownIcon}
    />
  );

  const themedPostfixComponent = tooltip ? (
    <Tooltip themed tooltip={tooltip} position="BOTTOM">
      <DropdownArrow mode={focused ? "active" : "inactive"}>
        <Icon src={AngleDownIcon} />
      </DropdownArrow>
    </Tooltip>
  ) : (
    <DropdownArrow mode={focused ? "active" : "inactive"}>
      <Icon src={AngleDownIcon} />
    </DropdownArrow>
  );

  const prefixComponent = icon && (
    <DropdownIcon>
      <Icon src={icon} />
    </DropdownIcon>
  );

  let dropdownVariant = "dropdown";
  if (focused) {
    if (isReversed) {
      dropdownVariant = "dropdownActiveTop";
    } else {
      dropdownVariant = "dropdownActive";
    }
  }

  const commonProps = {
    innerRef,
    inputRef,
    focused,
    placeholder,
    className,
    prefixClassName,
    prefixComponent,
    postfixComponent: themed ? themedPostfixComponent : postfixComponent,
    disabled,
    themed,
    variant: dropdownVariant,
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
  inputRef: PropTypes.shape({}),
  innerRef: PropTypes.shape({}),
  isReversed: PropTypes.bool,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  optionKey: PropTypes.string,
  placeholder: PropTypes.string,
  prefixClassName: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.shape({})),
  withMultiple: PropTypes.bool,
  withSearch: PropTypes.bool,
  themed: PropTypes.bool,
  icon: PropTypes.node,
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
  tooltip: "",
  text: "",
  themed: false,
};

export default Input;
