import React from "react";
import Modal from "@src/components/Overlays/Modal";
import Icon from "@src/components/UI/Icon";
import CloseIcon from "@src/icons/close.svg";
import styles from "./ConfirmationDialog.scss";

const ConfirmationDialog = () => WrappedComponent => {
  return props => {
    const [modalActive, setModalActive] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({});
    const confirmationCallback = React.useRef(() => {});

    const activateConfirmationDialog = React.useCallback(
      (modalContent = {}, callback) => {
        setModalActive(true);
        setModalContent(modalContent);
        confirmationCallback.current = callback;
      },
    );

    const deactivateConfirmationDialog = React.useCallback(e => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      confirmationCallback.current = null;
      setModalActive(false);
    });

    const deactivatePositive = React.useCallback(() => {
      if (confirmationCallback.current) confirmationCallback.current(true);
      deactivateConfirmationDialog();
    });

    const deactivateNegative = React.useCallback(() => {
      if (confirmationCallback.current) confirmationCallback.current(false);
      deactivateConfirmationDialog();
    });

    const {
      title = "Confirm",
      message = "You have unsaved changes, are you sure you want to continue ?",
      positiveText = "Yes",
      negativeText = "No",
    } = modalContent;
    return (
      <>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          activateConfirmationDialog={activateConfirmationDialog}
          deactivateConfirmationDialog={deactivateConfirmationDialog}
          confirmationDialogActive={modalActive}
        />
        <Modal
          active={modalActive}
          onEnter={deactivatePositive}
          onOverlayClick={deactivateNegative}
        >
          <div className={styles.dialogHeader}>
            <h3 className={styles.dialogHeaderText}>{title}</h3>
            <Icon
              onClick={deactivateNegative}
              src={CloseIcon}
              className={styles.dialogHeaderCloseIcon}
            />
          </div>
          <div className={styles.dialogBody}>
            <p className={styles.dialogText}>{message}</p>
            <div className={styles.dialogButtons}>
              <button
                type="button"
                onClick={deactivatePositive}
                className={`${styles.dialogButton} ${styles.dialogButtonPositive}`}
              >
                {positiveText}
              </button>
              <button
                type="button"
                onClick={deactivateNegative}
                className={`${styles.dialogButton} ${styles.dialogButtonNegative}`}
              >
                {negativeText}
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  };
};

export default ConfirmationDialog;
