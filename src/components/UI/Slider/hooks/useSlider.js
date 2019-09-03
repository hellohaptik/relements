import React from 'react';

const getNumChildren = (children) => {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (child) count += 1;
  });

  return count;
};

export default function useSlider(children, { onChange, centerMode, initialSlide }) {
  const [left, setLeft] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [slide, setSlide] = React.useState(initialSlide);
  const sliderWrapperRef = React.useRef();
  const numberOfElements = getNumChildren(children);
  const sliderElementRefs = new Array(numberOfElements).fill(0).map(() => React.createRef());

  const slideTo = React.useCallback((index) => (e) => {
    let slideToIndex = index;

    if (slideToIndex > numberOfElements - 1) {
      slideToIndex = numberOfElements - 1;
    } else if (slideToIndex < 0) {
      slideToIndex = 0;
    }

    let left = sliderElementRefs.reduce((leftTotal, elementRef, i) => {
      if (i < index) leftTotal += elementRef.current.getBoundingClientRect().width;
      return leftTotal;
    }, 0);

    if (centerMode) {
      left += sliderElementRefs[index].current.getBoundingClientRect().width / 2;
    } else if (slideToIndex !== 0) {
      left += -60;
    }

    setLeft(left);
    setSlide(slideToIndex);
    onChange && onChange(slideToIndex);
  });

  React.useEffect(() => {
    if (centerMode) {
      const offset = sliderWrapperRef.current.getBoundingClientRect().width / 2;
      setOffset(offset);
    }
    slideTo(initialSlide || 0);
  }, [sliderWrapperRef.current]);

  return {
    left,
    offset,
    slide,
    sliderWrapperRef,
    sliderElementRefs,
    slideTo,
    numElements: numberOfElements,
  };
}
