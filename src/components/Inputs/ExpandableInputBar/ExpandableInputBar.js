import React from "react";
import PropTypes from "prop-types";

import Text from "components/Inputs/Text";
import Button from "components/UI/Button";
import Icon from "components/UI/Icon";
import Loader from "components/UI/Loader";

import { INPUTBAR_MESSAGE_TYPES } from "./constants";

import styles from "./ExpandableInputBar.scss";

const ExpandableInputBar = ({
  prefixClassName = "",
  className = "",
  buttonText,
  buttonType,
  expandedButtonText,
  showLoader,
  disabled,
  onDismiss,
  alwaysActive,
  onClick,

  message,
  tooltip,
  placeholder,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  innerRef,
}) => {
  const [isActive, setIsActive] = React.useState(
    false || alwaysActive || showLoader,
  );
  const [inputValue, setInputValue] = React.useState(value);
  const [messageBody, setMessageBody] = React.useState(message);

  const activateSearchBar = React.useCallback(() => {
    setIsActive(true);
  }, [isActive]);

  const handleOnDismiss = () => {
    if (!alwaysActive) {
      setIsActive(false);
    }
    setInputValue("");
    setMessageBody({
      text: "",
      type: "default",
    });
    onDismiss();
  };

  const handleOnClick = React.useCallback(() => {
    onClick(inputValue);
  }, [inputValue]);

  const handleTextChange = value => {
    setMessageBody({
      text: "",
      type: "default",
    });
    setInputValue(value);
    onChange();
  };

  const buttonAction = isActive ? handleOnClick : activateSearchBar;
  const buttonDisabled = disabled || (isActive && !inputValue) || showLoader;
  const ctaText = isActive ? expandedButtonText || buttonText : buttonText;
  const dismissIconClass = alwaysActive && !inputValue && styles.hidden;
  const activeClasses = `${styles.active} ${messageBody.type}`;

  return (
    <div
      data-testid="ExpandableInputBar"
      className={`
                ${styles.expandableInputBar}
                ${className}
                ${isActive ? activeClasses : styles.inactive}
                ${label && styles.hasLabel}`}
    >
      <div className={`${styles.inner} ${prefixClassName}-inner`}>
        <div
          className={`${styles.textContent} ${prefixClassName}-inner-text-content`}
        >
          <Text
            value={inputValue}
            placeholder={placeholder}
            onChange={handleTextChange}
            className={`${styles.inputText} ${prefixClassName}-inner-input`}
            disabled={disabled || showLoader}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            innerRef={innerRef}
            label={label}
            tooltip={tooltip}
            prefixClassName={styles.searchBarText}
          />

          {isActive && !showLoader ? (
            <Icon
              src="closeV2"
              onClick={handleOnDismiss}
              className={`${dismissIconClass} ${styles.dismissIcon} ${prefixClassName}-dismiss-icon`}
            />
          ) : (
            <Loader
              size={14}
              className={`${styles.loader} ${prefixClassName}-loader`}
            />
          )}
        </div>

        <Button
          onClick={buttonAction}
          type={buttonType}
          disabled={buttonDisabled}
          className={`${styles.actionButton} ${prefixClassName}-inner-button`}
        >
          {ctaText}
        </Button>
      </div>
      {isActive && messageBody.text && (
        <div className={styles.message}>{messageBody.text}</div>
      )}
    </div>
  );
};

ExpandableInputBar.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The text on the action button before expanding */
  buttonText: PropTypes.string,
  /** The type of the button (primary, secondary, grey etc.) */
  buttonType: PropTypes.oneOf([
    Button.TYPES.DEFAULT,
    Button.TYPES.PRIMARY,
    Button.TYPES.SECONDARY,
    Button.TYPES.OUTLINE,
    Button.TYPES.GREY,
    Button.TYPES.WARNING,
    Button.TYPES.YELLOW,
  ]),
  /** The text on the action button after expanding,
   * if not provided, will use buttonText
   */
  expandedButtonText: PropTypes.string,
  /** Placeholder text on the input after expanding */
  placeholder: PropTypes.string,
  /** Determines if loader is to be shown. Will disable input and button when set to true,
   * signifying an action is in process. */
  showLoader: PropTypes.bool,
  /** Determines if search bar should be disabled */
  disabled: PropTypes.bool,
  /** Function which will be called when dismissing the search bar.
   * A required prop when driving from parent.
   */
  onDismiss: PropTypes.func,
  /** If set to 'true',
   * the bar won't be dismissed it will always be shown. */
  alwaysActive: PropTypes.bool,
  /** The action which will take place when button is clicked after expanding */
  onClick: PropTypes.func,

  /** Label for the input */
  label: PropTypes.string,
  /** Contains message and its type (default/success/warning/error) */
  message: PropTypes.object,
  /** Tooltip to help user with the input fields */
  tooltip: PropTypes.string,

  /** Value of the Text Field */
  value: PropTypes.string,
  /** onChange Callback */
  onChange: PropTypes.func,
  /** onFocus Callback */
  onFocus: PropTypes.func,
  /** onBlur Callback */
  onBlur: PropTypes.func,
  /** onKeyDown Callback */
  onKeyDown: PropTypes.func,
  /** Passing Ref for input field reference */
  innerRef: PropTypes.func,
};

ExpandableInputBar.defaultProps = {
  prefixClassName: "",
  className: "",
  buttonText: "",
  buttonType: Button.TYPES.OUTLINE,
  expandedButtonText: "",
  placeholder: "",
  label: "",
  showLoader: false,
  disabled: false,
  onDismiss: () => {},
  alwaysActive: false,
  onClick: () => {},

  message: {
    text: "",
    type: "default",
  },
  tooltip: "",
  value: "",
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  innerRef: () => {},
};

ExpandableInputBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-inner": "Child of the Main element",
  "$prefix-text-content": "Text input container",
  "$prefix-inner-input": "Text input",
  "$prefix-inner-button": "Action button of Inputbar",
  "$prefix-dismiss-icon": "Dismiss icon of Inputbar",
  "$prefix-loader": "Loader for Inputbar",
};

ExpandableInputBar.TYPES = { ...INPUTBAR_MESSAGE_TYPES };

export default ExpandableInputBar;
