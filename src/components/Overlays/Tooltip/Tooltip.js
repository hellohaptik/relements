import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import useActivify from '@src/hooks/useActivify';
import usePositioner from '@src/hooks/usePositioner';
import useEscapeKey from '@src/hooks/useEscapeKey';

import styles from './Tooltip.scss';

let modalRoot = document.getElementById('portal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'portal-root');
  document.body.appendChild(modalRoot);
}

function Tooltip({
  active,
  position,
  className,
  prefixClassName,
  attachTo,
  onClose,
  children,
  offset,
}) {
  const tooltipRef = React.useRef();
  const coordinates = usePositioner({
    attachTo,
    attachee: tooltipRef,
    position,
    offset,
  });

  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.tooltipActive : '';
  const topPositionClassName = position === 'TOP' ? styles.top : styles.bottom;

  useEscapeKey(onClose);

  if (!attachTo || !enabled) return null;

  return (
    <Portal node={document && document.getElementById('portal-root')}>
      <div
        className={`${styles.tooltipWrapper} ${className} ${prefixClassName}`}
      >
        <div
          onClick={onClose}
          className={`${styles.tooltipOverlay} ${prefixClassName}-overlay`}
        />
        <div
          className={`${styles.tooltip} ${activeClassName} ${prefixClassName}-inner`}
          ref={tooltipRef}
          style={coordinates}
        >
          <div
            className={`${styles.tooltipArrow} ${topPositionClassName} ${prefixClassName}-caret`}
          />
          <div
            className={`${styles.tooltipContent} ${topPositionClassName} ${prefixClassName}-body`}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

Tooltip.propTypes = {
  attachTo: PropTypes.object.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onClose: PropTypes.func,
  position: PropTypes.string,
  offset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
};

Tooltip.defaultProps = {
  active: false,
  children: null,
  className: '',
  prefixClassName: '',
  position: '',
  onClose: () => {},
  offset: null,
};

export default Tooltip;
