import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";

import useActivify from "@src/hooks/useActivify";
import useEscapeKey from "@src/hooks/useEscapeKey";
import useEnterKey from "@src/hooks/useEnterKey";

import styles from "./Modal.scss";
import ModalHeader from "./components/ModalHeader";

const Modal = ({
  onClose,
  onEnter,
  className,
  children,
  noOverlay,
  active,
  prefixClassName,
}) => {
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.modalActive : "";

  useEscapeKey(onClose);
  useEnterKey(onEnter);

  if (!enabled) return null;
  return (
    <Portal>
      <div
        data-testid="modal"
        className={`${styles.modalWrapper} ${prefixClassName} ${className}`}
      >
        {noOverlay ? null : (
          <div
            className={`${styles.modalOverlay} ${activeClassName} ${prefixClassName}-overlay`}
            onClick={onClose}
          />
        )}
        <div
          className={`${styles.modal} ${activeClassName} ${prefixClassName}-body`}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.Header = ModalHeader;

Modal.propTypes = {
  /** The content you want to render inside the modal */
  children: PropTypes.node,
  /** When the modal closes, this is the callback function called */
  onClose: PropTypes.func,
  /** When the enter button is pressed, this function is called */
  onEnter: PropTypes.func,
  /** Whether the modal is visible or not */
  active: PropTypes.bool,
  /** The className applied to the outermost div of the element */
  className: PropTypes.string,
  /** The prefixClassName appended to all the layers */
  prefixClassName: PropTypes.string,
  /** If true, doesnt render the overlay (transparent) */
  noOverlay: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: () => {},
  onEnter: () => {},
  active: false,
  className: "",
  prefixClassName: "",
  noOverlay: false,
};

Modal.classNames = {
  $prefix: "The main wrapper inside the portal",
  "$prefix-overlay": "The overlay covering the page",
  "$prefix-body": "The actual modal itself",
};

export default Modal;
