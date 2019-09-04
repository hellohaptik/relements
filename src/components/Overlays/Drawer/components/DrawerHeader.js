import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import Button from "components/UI/Button";
import CloseIcon from "icons/close.svg";
import CloneIcon from "icons/synonym-duplicate.svg";
import styles from "./DrawerHeader.scss";

const ComponentDrawerHeader = ({
  children,
  onClose,
  onSave,
  onCopy,
  onDone,
}) => {
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
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onCopy: PropTypes.func,
  onDone: PropTypes.func,
};

export default ComponentDrawerHeader;
