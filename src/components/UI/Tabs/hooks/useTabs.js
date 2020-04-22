import React, { useState, useEffect } from 'react';

/**
 * React hook to manage calculation and positioning of the tab indicator
 * It is also responsible for injecting children with additional calculated
 * props.
 * @export
 * @param {string} value the identifier of the tab selected
 * @param {array} DOMRefs the array of dom element refs used for width and offset calc
 * @param {array} children the array of children that need to be rendered as tabs
 * @returns {array} returns an array containing left, width, renderTabs(func to render tabs)
 */
export function useTabs(value, DOMRefs, children) {
  /**
   * activeIndex tracks the index of the currently selected menu item
   * left is the x-offset of the selected menu item (where the underline starts)
   * width the is width of the selected menu item
   * @type {Object}
   */
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * This calculates the width and the offset of a particular menu item (whose
   * index is the param). Uses getBoundingClientRect and the DOMElements to
   * determine the right values
   * @param  {string} value the value for which the index needs to be calculated
   * @returns {number} the index corresponding to the value provided
   */
  const getIndexFromValue = (value) => {
    let index = -1;
    React.Children.forEach(children, (child, i) => {
      const childValue = child.props.value;
      if (typeof childValue === 'string' && childValue === value) {
        index = i;
      }
    });

    return index;
  };

  /**
   * Returns the width and offset of the item that's selected
   * @param  {number} index the index of the tab for which the calculation needs to run
   * @return {array} an array containing the left offset and the width of the indicator
   */
  const calcWidthAndPosition = (index) => {
    let left = 0;
    let width = 0;
    DOMRefs.map((DOMElement, i) => {
      if (i < index && i >= 0) {
        left += DOMElement.current.getBoundingClientRect().width;
      } else if (i === index) {
        width = DOMElement.current.getBoundingClientRect().width - 1;
      }
    });

    return [left, width];
  };

  /**
   * On mount we check if there's already a menu item that's selected, if yes,
   * then calculate it's left position as well as the width. So that we can
   * set the underline at the right position with the right dimensions
   * @return {[type]} [description]
   */
  useEffect(() => {
    const index = getIndexFromValue(value);
    const [left, width] = calcWidthAndPosition(index);
    setLeft(left);
    setWidth(width);
    setActiveIndex(index);
  }, [value]);

  /**
   * Injects props such as innerRef and the active bool by
   * cloning the element
   * @returns children cloned with Props
   */
  const renderTabs = () => React.Children.map(children, (child, i) => {
    return React.cloneElement(child, { innerRef: DOMRefs[i], active: activeIndex === i });
  });

  return [left, width, renderTabs];
}
