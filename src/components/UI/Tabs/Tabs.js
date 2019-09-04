import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";

import { TabsItem } from "./components/TabsItem";
import { useTabs } from "./hooks/useTabs";
import styles from "./Tabs.scss";

/**
 * Renders the container for tabs and handles the calculation and placement of the tab
 * indicator.
 * It also exposes a static property called Item which is what the component uses to render the children
 */
const Tabs = ({ className, prefixClassName, children, value = "" }) => {
  const { primaryColor } = React.useContext(Context);
  const DOMRefs = new Array(React.Children.count(children))
    .fill()
    .map(() => React.useRef());
  const [left, width, renderTabs] = useTabs(value, DOMRefs, children);
  const transform = `translateX(${left}px) scale(${width}, 1)`;

  return (
    <div
      data-testid="tabs"
      className={`${styles.Tabs} ${prefixClassName} ${className}`}
    >
      <div className={`${styles.TabsItems} ${prefixClassName}-items`}>
        {renderTabs()}
      </div>
      <div
        style={{ transform, backgroundColor: primaryColor }}
        className={`${styles.TabsIndicator} ${prefixClassName}-indicator`}
      />
    </div>
  );
};

// TabsItem becomes available as a static property
// and can be referred to as <Tabs.Item .../>
Tabs.Item = TabsItem;

Tabs.propTypes = {
  /* The value of the current tab selected */
  value: PropTypes.string,
  /* The classname to be attached to the outermost element */
  className: PropTypes.string,
  /* The classname that  gets added to all the dom elements of this component */
  prefixClassName: PropTypes.string,
  /* tabs that need to be rendered. Expect <Tabs.Item> as children */
  children: PropTypes.node,
};

export default Tabs;
