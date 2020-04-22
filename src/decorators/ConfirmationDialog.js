import React from 'react';
import ComponentModal from 'components/ComponentModal';
import Icon from 'components/UI/Icon';
import CloseIcon from 'icons/close.svg';
import styles from './ConfirmationDialog.scss';

export const ConfirmationDialog = () => (WrappedComponent) => {
  return class extends React.Component {
    state = {
      modalActive: false,
      modalContent: {},
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            activateConfirmationDialog={this.activateConfirmationDialog}
            deactivateConfirmationDialog={this.deactivateConfirmationDialog}
            confirmationDialogActive={this.state.modalActive}
          />
          {this._renderConfirmationDialog()}
        </React.Fragment>
      );
    }

    activateConfirmationDialog = (modalContent = {}, callback) => {
      this.setState({ modalActive: true, modalContent });
      this._callback = callback;
    };

    deactivateConfirmationDialog = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.setState({ modalActive: false });
    };

    _deactivatePositive = () => {
      this._callback(true);
      this.deactivateConfirmationDialog();
    };

    _deactivateNegative = () => {
      this._callback(false);
      this.deactivateConfirmationDialog();
    };

    _renderConfirmationDialog = () => {
      const {
        title = 'Confirm',
        message = 'You have unsaved changes, are you sure you want to continue ?',
        positiveText = 'Yes',
        negativeText = 'No',
      } = this.state.modalContent;
      return (
        <ComponentModal
          active={this.state.modalActive}
          onEnter={this._deactivatePositive}
          onOverlayClick={this._deactivateNegative}
        >
          <div className={styles.dialogHeader}>
            <h3 className={styles.dialogHeaderText}>{title}</h3>
            <Icon
              onClick={this._deactivateNegative}
              src={{ default: CloseIcon }}
              className={styles.dialogHeaderCloseIcon}
            />
          </div>
          <div className={styles.dialogBody}>
            <p className={styles.dialogText}>{message}</p>
            <div className={styles.dialogButtons}>
              <button
                onClick={this._deactivatePositive}
                className={`${styles.dialogButton} ${styles.dialogButtonPositive}`}
              >
                {positiveText}
              </button>
              <button
                onClick={this._deactivateNegative}
                className={`${styles.dialogButton} ${styles.dialogButtonNegative}`}
              >
                {negativeText}
              </button>
            </div>
          </div>
        </ComponentModal>
      );
    };
  };
};
