import { useState, useEffect } from 'react';

export function useTabs(value, onChange, options, optionKey) {
  const [DOMRects, setDOMRects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(value);

  const getPosition = () => {
    let offset = 0;
    let width = 0;
    DOMRects.map((DOMElementRect, i) => {
      if (i === activeIndex) {
        width = DOMElementRect.width;
      } else if (i < activeIndex) {
        offset += DOMElementRect.width;
      }
    });

    return { width, offset };
  };

  const handleRef = (index) => (DOMElement) => {
    if (DOMElement) {
      const DOMElementRect = DOMElement.getBoundingClientRect();
      const currentRect = DOMRects[index];

      if (!currentRect || currentRect.width !== DOMElementRect.width) {
        DOMRects[index] = DOMElementRect;
        setDOMRects(DOMRects);
      }
    }
  };

  const handleChange = (index) => () => onChange(options[index]);
  const getOption = (option) => (typeof option !== 'object' ? option : option[optionKey || 'name']);
  const displayOptions = options.map((option) => getOption(option));
  const { width, offset } = getPosition();

  useEffect(() => {
    let index;

    if (typeof options[0] !== 'object') {
      index = options.indexOf(value);
    } else {
      index = options.findIndex((item) => item[optionKey] === value);
    }

    setActiveIndex(index);
  }, [value]);

  return {
    displayOptions,
    handleChange,
    handleRef,
    width,
    offset,
    activeIndex,
  };
}
