import React from 'react';
import PropTypes from 'prop-types';
import Context from '@src/components/Context';
import Icon from '@src/components/UI/Icon';

import styles from './TabsItem.scss';

/**
 * Renders an individual tab with an optional icon and text
 * if the children is of type string then it uses it as a title and renders
 * the tab with our design.
 * If the children is an element instead, then it just directly get's rendered inside the div
 */
export const TabsItem = ({
  children,
  active,
  disabled,
  icon,
  prefixClassName,
  onClick,
  innerRef,
  value,
  type,
}) => {
  const { primaryColor } = React.useContext(Context);
  const component = typeof children !== 'string' && typeof children !== 'number'
    ? children
    : null;
  const title = component ? null : children;
  const activeClassName = active
    ? `${styles.active} ${prefixClassName}-active`
    : '';
  const activeIconClassName = active ? 'active' : '';
  const disabledClassName = disabled ? styles.disabled : '';
  const bigClassName = type === 'big' ? styles.big : '';

  return (
    <div
      onClick={() => onClick(value)}
      ref={innerRef}
      className={`${styles.TabsItem} ${prefixClassName} ${activeClassName} ${disabledClassName} ${bigClassName}`}
    >
      {component ? (
        React.cloneElement(component, { active })
      ) : (
        <>
          {icon ? (
            <Icon
              src={icon}
              className={`${styles.TabsItemIcon} ${bigClassName} ${prefixClassName}-icon ${activeIconClassName}`}
            />
          ) : null}
          <span
            style={{ color: active ? primaryColor : undefined }}
            className={`${styles.TabsItemText} ${activeClassName} ${bigClassName} ${prefixClassName}-text`}
          >
            {title}
          </span>
        </>
      )}
    </div>
  );
};

TabsItem.propTypes = {
  /* If the children is an element instead, then it just directly get's rendered inside the div */
  children: PropTypes.node,
  /* Whether the tab inside the tabs is active or not */
  active: PropTypes.bool,
  /* Whether the tab is disabled (not clickable) */
  disabled: PropTypes.bool,
  /* The icon to render inside the tab. Can be a string (icon type) or the icon element itself */
  icon: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  /* The classname that  gets added to all the dom elements of this component */
  prefixClassName: PropTypes.string,
  /* The onClick callback */
  onClick: PropTypes.func,
  /* The ref that's passed down to the top level DOM Element */
  innerRef: PropTypes.object,
  /* The value of the tab item. This gets passed to the onClick as a parameter */
  value: PropTypes.string,
};
