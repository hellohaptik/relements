import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import Button from "components/UI/Button";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";
import CloseIcon from "icons/close.svg";
import ArrowIcon from "icons/arrow.svg";
import CloseIconV2 from "icons/close-v2.svg";
import CloneIcon from "icons/synonym-duplicate.svg";
import ThemedDrawerHeader from "./ThemedDrawerHeader";
import styles from "./DrawerHeader.scss";

const ComponentDrawerHeader = props => {
  const {
    children,
    onClose,
    onBackButtonClick,
    onSave,
    onCopy,
    onDone,
    themed,
  } = props;

  if (themed) {
    const drawerHeaderProps = {
      ...props,
      "data-testid": "themedDrawerHeader",
    };
    return (
      <ThemedDrawerHeader {...drawerHeaderProps}>
        <Box alignItems="center" padding="0">
          {onBackButtonClick ? (
            <Icon
              onClick={onBackButtonClick}
              className={styles.backicon}
              src={ArrowIcon}
            />
          ) : null}
          <Text variant="h3.semi-bold">{props.children}</Text>
        </Box>
        <Box padding="0">
          <Icon onClick={onClose} src={CloseIconV2} />
        </Box>
      </ThemedDrawerHeader>
    );
  }

  return (
    <div className={styles.drawerHeader}>
      <div className={styles.leftColumn}>
        {onClose ? (
          <Icon onClick={onClose} className={styles.icon} src={CloseIcon} />
        ) : null}
        {onDone ? (
          <Button onClick={onDone} className={styles.doneButton}>
            Done
          </Button>
        ) : null}
        {children}
      </div>
      <div className={styles.rightColumn}>
        {onCopy ? (
          <Icon
            onClick={onCopy}
            className={styles.copyButton}
            src={CloneIcon}
          />
        ) : null}
        {onSave ? (
          <div onClick={onSave} className={styles.saveButton}>
            Save
          </div>
        ) : null}
      </div>
    </div>
  );
};

ComponentDrawerHeader.propTypes = {
  children: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onCopy: PropTypes.func,
  onDone: PropTypes.func,
  themed: PropTypes.bool,
};

export default ComponentDrawerHeader;
