import React from 'react';
import Icon from 'components/UI/Icon';
import ErrorIcon from 'icons/close.svg';
import SuccessIcon from 'icons/tick.svg';
import WarningIcon from 'icons/alert.svg';
import ComponentToastMessage from 'components/ComponentToastMessage';
import styles from './ToastMessage.scss';

const TOAST_DEFAULT_TIMEOUT = 2000;

export const ToastMessage = () => (WrappedComponent) => {
  return class extends React.Component {
    state = {
      toastActive: false,
      toastMessage: {},
    };

    componentWillUnmount() {
      clearTimeout(this._timeout);
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            activateToastMessage={this.activateToastMessage}
            deactivateToastMessage={this.deactivateToastMessage}
            toastMessageActive={this.state.toastActive}
          />
          {this._renderToastMessage()}
        </React.Fragment>
      );
    }

    activateToastMessage = (toastMessage = {}, cb) => {
      if (typeof toastMessage === 'string') {
        toastMessage = {
          title: toastMessage,
        };
      }
      this.setState({ toastActive: true, toastMessage });
      this._timeout = setTimeout(() => {
        this.deactivateToastMessage();
        if (cb && typeof cb === 'function') cb();
      }, toastMessage.timeout || TOAST_DEFAULT_TIMEOUT);
    };

    deactivateToastMessage = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      this.setState({ toastActive: false });
    };

    _renderToastMessage = () => {
      const { title = 'Confirm', type = 'NEGATIVE' } = this.state.toastMessage;
      return (
        <ComponentToastMessage active={this.state.toastActive} onOverlayClick={this.deactivateToastMessage}>
          <div className={styles.toastMessage}>
            {this._renderToastIcon(type)}
            <span className={styles.toastMessageText}>{title}</span>
          </div>
        </ComponentToastMessage>
      );
    };

    _renderToastIcon = (type) => {
      switch (type) {
        case 'POSITIVE':
          return <Icon className={styles.toastMessageIconSuccess} src={{ default: SuccessIcon }} />;
        case 'WARNING':
          return <Icon className={styles.toastMessageIconWarning} src={{ default: WarningIcon }} />;
        default:
          return <Icon className={styles.toastMessageIconError} src={{ default: ErrorIcon }} />;
      }
    };
  };
};
