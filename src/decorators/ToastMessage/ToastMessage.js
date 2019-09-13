import React from "react";
import Icon from "components/UI/Icon";
import ErrorIcon from "icons/close.svg";
import SuccessIcon from "icons/tick.svg";
import WarningIcon from "icons/alert.svg";

import Toast from "@src/components/Overlays/Toast";
import styles from "./ToastMessage.scss";

const TOAST_DEFAULT_TIMEOUT = 2000;

const renderToastIcon = type => {
  switch (type) {
    case "POSITIVE":
      return (
        <Icon className={styles.toastMessageIconSuccess} src={SuccessIcon} />
      );
    case "WARNING":
      return (
        <Icon className={styles.toastMessageIconWarning} src={WarningIcon} />
      );
    default:
      return <Icon className={styles.toastMessageIconError} src={ErrorIcon} />;
  }
};

const ToastMessage = () => WrappedComponent => {
  return props => {
    const [toastActive, setToastActive] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState(false);
    const timeout = React.useRef();

    const deactivateToastMessage = React.useCallback(e => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      setToastActive(false);
    });

    const activateToastMessage = React.useCallback((toastMessage = {}, cb) => {
      if (typeof toastMessage === "string") {
        toastMessage = { title: toastMessage };
      }

      setToastActive(true);
      setToastMessage(toastMessage);
      timeout.current = setTimeout(() => {
        deactivateToastMessage();
        if (cb && typeof cb === "function") cb();
      }, toastMessage.timeout || TOAST_DEFAULT_TIMEOUT);
    });

    React.useEffect(() => () => clearTimeout(timeout.current));

    const { title = "Confirm", type = "NEGATIVE" } = toastMessage;
    return (
      <>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          activateToastMessage={activateToastMessage}
          deactivateToastMessage={deactivateToastMessage}
          toastMessageActive={toastActive}
        />
        <Toast active={toastActive} onOverlayClick={deactivateToastMessage}>
          <div className={styles.toastMessage}>
            {renderToastIcon(type)}
            <span className={styles.toastMessageText}>{title}</span>
          </div>
        </Toast>
      </>
    );
  };
};

export default ToastMessage;
