import React from "react";
import PropTypes from "prop-types";
import Icon from "@src/components/UI/Icon";
import Button from "@src/components/UI/Button";
import CloseIcon from "@src/icons/close.svg";

import styles from "./ModalHeader.scss";

const ModalHeader = ({
  children,
  customCloseIcon,
  onClose,
  onSave,
  className,
  prefixClassName,
  withSave,
  saveTitle,
  isCloseOnRight,
  isWithoutUnderline,
}) => {
  const closeIconPositionClass = isCloseOnRight ? styles.closeOnRight : "";
  const underlineClass = isWithoutUnderline
    ? styles.modalHeaderWithoutUnderline
    : "";
  const rightMarginClass =
    isCloseOnRight && !withSave ? styles.iconWithoutRightMargin : "";

  return (
    <div
      data-testid="modal-header"
      className={`${styles.modalHeader} ${prefixClassName} ${className} ${underlineClass}`}
    >
      <div
        data-testid="modal-header-left-column"
        className={`${styles.leftColumn} ${closeIconPositionClass} ${prefixClassName}-column-left`}
      >
        <Icon
          onClick={onClose}
          prefixClassName={`${prefixClassName}-icon`}
          className={`${styles.icon} ${rightMarginClass}`}
          src={customCloseIcon || CloseIcon}
        />
        {children}
      </div>
      {withSave ? (
        <div
          className={`${styles.rightColumn} ${prefixClassName}-column-right`}
        >
          <Button
            type={Button.TYPES.PRIMARY}
            onClick={onSave}
            className={`${prefixClassName}-cta`}
          >
            {saveTitle || "Save"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

ModalHeader.propTypes = {
  /** The title of the header */
  children: PropTypes.string,
  /** The className added to the outermost element */
  className: PropTypes.string,
  /** The callback for closing the modal */
  onClose: PropTypes.func,
  /** The callback called when clicking on the primary CTA */
  onSave: PropTypes.func,
  /** prefix added to all the div layers */
  prefixClassName: PropTypes.string,
  /** The save button text (The text shown on the primary cta) */
  saveTitle: PropTypes.string,
  /** Whether to disable the save button */
  withSave: PropTypes.bool,
  /** Whether to put close icon on the right of the header title */
  isCloseOnRight: PropTypes.bool,
  /** Whether to put underline */
  isWithoutUnderline: PropTypes.bool,
  /** Custom close icon for modal header, can either be a string identifier
   * for the icon (angle-down) or a react node  */
  customCloseIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

ModalHeader.defaultProps = {
  children: "",
  className: "",
  customCloseIcon: "",
  onClose: () => {},
  onSave: () => {},
  prefixClassName: "",
  saveTitle: "",
  withSave: false,
  isCloseOnRight: false,
  isWithoutUnderline: false,
};

ModalHeader.classNames = {
  $prefix: "the outermost element",
  "$prefix-column-left": "The left column of the header",
  "$prefix-icon": "The cross button",
  "$prefix-column-right": "The right column of the header",
  "$prefix-cta": "The CTA on the right",
};

export default ModalHeader;
