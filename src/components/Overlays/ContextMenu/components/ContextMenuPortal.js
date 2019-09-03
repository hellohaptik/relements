import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';

import useActivify from '@src/hooks/useActivify';
import useEscapeKey from '@src/hooks/useEscapeKey';
import useEnterKey from '@src/hooks/useEnterKey';
import usePositioner from '../hooks/usePositioner';

import styles from './ContextMenuPortal.scss';

const ContextMenuPortal = ({
  active,
  className,
  onClose,
  children,
  maxHeight,
  attachTo,
  offset,
  prefixClassName,
}) => {
  const contextMenuDOM = React.useRef();
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.contextMenuActive : '';
  const position = usePositioner(attachTo, contextMenuDOM, offset);

  useEscapeKey(onClose);
  useEnterKey(onClose);

  if (!enabled) return null;
  return (
    <Portal>
      <div
        data-testid="context-menu"
        className={`${styles.contextMenuWrapper} ${className} ${prefixClassName}`}
      >
        <div
          className={`${styles.contextMenuOverlay} ${prefixClassName}-overlay`}
          onClick={onClose}
        />
        <div
          className={`${activeClassName} ${styles.contextMenu} ${prefixClassName}-context-menu`}
          ref={(DOMNode) => {
            if (DOMNode && active) DOMNode.focus();
            contextMenuDOM.current = DOMNode;
          }}
          style={position}
        >
          <div
            className={`${styles.contextMenuContent} ${prefixClassName}-context-menu-content`}
            style={{ maxHeight: maxHeight || '300px' }}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

ContextMenuPortal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  attachTo: PropTypes.object,
  maxHeight: PropTypes.number,
  onClose: PropTypes.func,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenuPortal.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
  onClose: () => {},
};

export default ContextMenuPortal;
