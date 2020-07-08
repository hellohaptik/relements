import React from "react";
import PropTypes from "prop-types";

import Text from "components/Inputs/Text";
import Button from "components/UI/Button";
import Icon from "components/UI/Icon";

import styles from "./SearchBar.scss";

const SearchBar = ({
  prefixClassName = "",
  className = "",
  primaryText,
  secondaryText,
  placeholder,
  active,
  onDismiss,
  alwaysActive,
  onClick,
  error,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    setIsActive(active || alwaysActive);
  }, [active || alwaysActive]);

  const activateSearchBar = React.useCallback(() => {
    setIsActive(true);
  }, []);

  const handleOnDismiss = React.useCallback(() => {
    if (!alwaysActive) {
      setIsActive(false);
      onDismiss();
    }
    setInputValue("");
  }, []);

  const handleOnClick = React.useCallback(() => {
    onClick(inputValue);
  }, [inputValue]);

  const handleTextChange = React.useCallback(value => {
    setInputValue(value);
  }, []);

  const buttonText = isActive ? secondaryText : primaryText;
  const buttonAction = isActive ? handleOnClick : activateSearchBar;
  const buttonDisabled = isActive && !inputValue;

  return (
    <div
      data-testid="SearchBar"
      className={`
                ${styles.searchBar}
                ${className}
                ${isActive ? styles.active : styles.inactive}`}
    >
      <div className={`${styles.inner} ${prefixClassName}-inner`}>
        <div className={styles.textContent}>
          <Text
            value={inputValue}
            placeholder={placeholder}
            onChange={handleTextChange}
            className={`${styles.inputText}`}
          />
          {isActive && (
            <Icon
              src="close"
              onClick={handleOnDismiss}
              className={styles.dismissIcon}
            />
          )}
        </div>
        <Button
          onClick={buttonAction}
          type="outline"
          disabled={buttonDisabled}
          className={styles.actionButton}
        >
          {buttonText}
        </Button>
      </div>
      {error && <span className={styles.message}>{error}</span>}
    </div>
  );
};

SearchBar.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The text on the primary action button before expanding */
  primaryText: PropTypes.string,
  /** The text on the primary action button after expanding */
  secondaryText: PropTypes.string,
  /** Placeholder text on the input after expanding */
  placeholder: PropTypes.string,
  /** Determines if search bar has expanded */
  active: PropTypes.bool,
  /** Function which will be called when dismissing the search bar.
   * A required prop when driving from parent.
   */
  onDismiss: PropTypes.func,
  /** If set to 'true',
   * the bar won't be dismissed it will always be shown. */
  alwaysActive: PropTypes.bool,
  /** The action which will take place when button is clicked after expanding */
  onClick: PropTypes.func,
  /** Error to be displayed (if any) */
  error: PropTypes.string,
};

SearchBar.defaultProps = {
  prefixClassName: "",
  className: "",
  primaryText: "Search",
  secondaryText: "Find them!",
  placeholder: "Search here",
  active: false,
  onDismiss: () => {},
  alwaysActive: false,
  onClick: () => {},
  error: "",
};

SearchBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-inner": "Child of the Main Search Bar Component",
  "$prefix-inner-message": "Message of the alert bar",
  "$prefix-alertbar-icon": "Attaches to outer container of the icon",
  "$prefix-dismiss": "Dismiss container",
  "$prefix-dismiss-icon": "Dismiss icon for message",
};

export default SearchBar;
