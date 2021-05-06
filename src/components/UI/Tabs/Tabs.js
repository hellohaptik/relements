import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import { ThemedTabs, ThemedTabsItems, ThemedTabsIndicator } from "./ThemedTabs";

import { TabsItem } from "./components/TabsItem";
import { useTabs } from "./hooks/useTabs";
import styles from "./Tabs.scss";

/**
 * Renders the container for tabs and handles the calculation and placement of the tab
 * indicator.
 * It also exposes a static property called Item which is what the component uses to render the children
 */
const Tabs = ({
  className,
  prefixClassName,
  children,
  value = "",
  themed = false,
}) => {
  const { primaryColor } = React.useContext(Context);
  const DOMRefs = React.useRef([]);
  const [left, width, renderTabs] = useTabs(value, DOMRefs.current, children);
  const transform = `translateX(${left}px) scale(${width}, 1)`;

  React.useEffect(() => {
    DOMRefs.current = new Array(React.Children.count(children))
      .fill()
      .map(() => React.createRef());
  }, [children]);

  if (themed)
    return (
      <ThemedTabs>
        <ThemedTabsItems>{renderTabs()}</ThemedTabsItems>
        <ThemedTabsIndicator left={left} width={width} />
      </ThemedTabs>
    );
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
  /* Use themed version of Tabs */
  themed: PropTypes.bool,
};

export default Tabs;
