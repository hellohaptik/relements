import React from "react";
import PropTypes from "prop-types";

import Text from "components/Inputs/Text";
import Button from "components/UI/Button";
import Icon from "components/UI/Icon";
import Loader from "components/UI/Loader";

import { SEARCHBAR_MESSAGE_TYPES } from "./constants";

import styles from "./ExpandableSearchBar.scss";

const ExpandableSearchBar = ({
  prefixClassName = "",
  className = "",
  buttonText,
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
  const buttonType =
    messageBody.type === ExpandableSearchBar.TYPES.ERROR
      ? Button.TYPES.WARNING
      : Button.TYPES.OUTLINE;
  const ctaText = isActive ? expandedButtonText || buttonText : buttonText;
  const dismissIconClass = alwaysActive && !inputValue && styles.hidden;

  return (
    <div
      data-testid="ExpandableSearchBar"
      className={`
                ${styles.expandableSearchBar}
                ${className}
                ${isActive ? styles.active : styles.inactive}
                ${isActive && messageBody.type}
                ${label && styles.label}`}
    >
      <div className={`${styles.inner} ${prefixClassName}-inner`}>
        <div className={styles.textContent}>
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
            prefixClassName={prefixClassName}
          />

          {isActive && !showLoader ? (
            <Icon
              src="close"
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

ExpandableSearchBar.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The text on the action button before expanding */
  buttonText: PropTypes.string,
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

ExpandableSearchBar.defaultProps = {
  prefixClassName: "",
  className: "",
  buttonText: "",
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

ExpandableSearchBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-inner": "Child of the Main Searchbar",
  "$prefix-inner-input": "Text input Searchbar",
  "$prefix-inner-button": "Action button of Searchbar",
  "$prefix-dismiss-icon": "Dismiss icon of Searchbar",
  "$prefix-loader": "Loader for Searchbar",
};

ExpandableSearchBar.TYPES = { ...SEARCHBAR_MESSAGE_TYPES };

export default ExpandableSearchBar;
