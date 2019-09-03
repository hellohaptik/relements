import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@src/components/UI/Icon';
import Button from '@src/components/UI/Button';
import CloseIcon from '@src/icons/close.svg';

import styles from './ModalHeader.scss';

const ModalHeader = ({
  children,
  onClose,
  onSave,
  className,
  prefixClassName,
  withSave,
  saveTitle,
}) => {
  return (
    <div className={`${styles.modalHeader} ${prefixClassName} ${className}`}>
      <div className={`${styles.leftColumn} ${prefixClassName}-column-left`}>
        <Icon
          onClick={onClose}
          prefixClassName={`${prefixClassName}-icon`}
          className={styles.icon}
          src={CloseIcon}
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
            {saveTitle || 'Save'}
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
};

ModalHeader.defaultProps = {
  children: '',
  className: '',
  onClose: () => {},
  onSave: () => {},
  prefixClassName: '',
  saveTitle: '',
  withSave: false,
};

ModalHeader.classNames = {
  $prefix: 'the outermost element',
  '$prefix-column-left': 'The left column of the header',
  '$prefix-icon': 'The cross button',
  '$prefix-column-right': 'The right column of the header',
  '$prefix-cta': 'The CTA on the right',
};

export default ModalHeader;
