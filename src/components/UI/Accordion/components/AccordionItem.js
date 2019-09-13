import React, { useCallback, useRef, useLayoutEffect } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import AngleDownIcon from "icons/angle-down.svg";
import ReorderIconSvg from "icons/hamburger.svg";
import Icon from "components/UI/Icon";
import styles from "./AccordionItem.scss";

function AccordionItem({
  active,
  onChange,
  index,
  itemIndex,
  className,
  children,
  renderHeader,
  prefixClassName,
}) {
  const activeClassName = active ? styles.active : "";
  const wrapperRef = useRef();
  const headerRef = useRef();
  const bodyRef = useRef();

  const _resize = useCallback(() => {
    if (!headerRef.current || !bodyRef.current || !wrapperRef.current) return;

    const headerRect = headerRef.current.getBoundingClientRect();
    const bodyRect = bodyRef.current.getBoundingClientRect();
    const totalHeight = headerRect.height + (active ? bodyRect.height : 0);

    wrapperRef.current.style.height = `${totalHeight}px`;
  });

  useLayoutEffect(() => {
    _resize();
  }, [children, renderHeader]);

  const _renderReorderIcon = useCallback(() => {
    const ReorderIcon = SortableHandle(Icon);
    return (
      <ReorderIcon
        className={`${styles.icon} ${styles.reorderIcon}`}
        src={ReorderIconSvg}
      />
    );
  });

  const _renderExpandIcon = useCallback(() => (
    <Icon
      className={`${styles.icon} ${styles.arrowIcon} ${activeClassName}`}
      src={AngleDownIcon}
    />
  ));

  const _renderHeader = useCallback(() => {
    if (typeof renderHeader === "function") {
      return renderHeader({
        ReorderIcon: _renderReorderIcon,
        ExpandIcon: _renderExpandIcon,
      });
    }
    return renderHeader;
  });

  const _renderChildren = useCallback(() => {
    return (
      <div>
        {React.Children.map(children, (child, i) => {
          if (!child) return null;
          return (
            <div
              className={`${styles.accordionItemBodyInner} ${prefixClassName}-body-item`}
              key={i}
            >
              {React.cloneElement(
                child,
                child.type !== "div" ? { resizeContainer: _resize } : null,
              )}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div
      ref={wrapperRef}
      className={`${styles.accordionItem} ${activeClassName} ${prefixClassName} ${className}`}
    >
      <div
        className={`${styles.accordionItemHeader} ${prefixClassName}-header`}
        onClick={e => onChange(index === null ? itemIndex : index, e)}
        ref={headerRef}
      >
        {_renderHeader()}
      </div>
      <div
        className={`${styles.accordionItemBody} ${prefixClassName}-body`}
        ref={bodyRef}
      >
        <CSSTransition
          in={active}
          timeout={1000}
          classNames="animating"
          unmountOnExit
        >
          {_renderChildren()}
        </CSSTransition>
      </div>
    </div>
  );
}

AccordionItem.propTypes = {
  index: PropTypes.number,
  itemIndex: PropTypes.number,
  children: PropTypes.node,
  active: PropTypes.bool,
  onChange: PropTypes.func,
  renderHeader: PropTypes.func,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
};

AccordionItem.defaultProps = {
  children: null,
  active: false,
  onChange: () => {},
  renderHeader: null,
  className: "",
  prefixClassName: "",
  itemIndex: 0,
  index: null,
};

AccordionItem.Sortable = SortableElement(AccordionItem);

export default AccordionItem;
