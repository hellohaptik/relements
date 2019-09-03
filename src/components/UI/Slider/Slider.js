import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/UI/Icon';
import AngleDownIcon from 'icons/angle-down.svg';

import styles from './Slider.scss';
import useSlider from './hooks/useSlider';

const renderArrow = (className, onClick) => (
  <div onClick={onClick} className={`${styles.componentSliderArrow} ${className}`}>
    <Icon className={styles.angleDownIcon} src={AngleDownIcon} />
  </div>
);

const Slider = ({
  className, centerMode, children, onChange, initialSlide, prefixClassName,
}) => {
  const {
    left, offset, slide, sliderWrapperRef, sliderElementRefs, slideTo, numElements,
  } = useSlider(children, {
    onChange,
    centerMode,
    initialSlide,
  });
  const leftArrowDisabledClass = slide === 0 ? styles.disabled : '';
  const rightArrowDisabledClass = slide === numElements - 1 || numElements < 2 ? styles.disabled : '';
  const transformStyle = { transform: `translate3d(${-1 * (left - offset)}px, 0, 0)` };

  return (
    <div data-testid="slider" ref={sliderWrapperRef} className={`${styles.componentSliderWrapper} ${className} ${prefixClassName}`}>
      {renderArrow(`${styles.left} ${prefixClassName}-arrow  ${prefixClassName}-arrow-left ${leftArrowDisabledClass}`, slideTo(slide - 1))}
      <div className={`${styles.componentSlider} ${leftArrowDisabledClass}`}>
        <div data-testid="slider-track" style={transformStyle} className={`${styles.componentSliderTrack} ${prefixClassName}-items`}>
          {React.Children.map(children, (child, index) => {
            if (!child) return null;
            const activeClassName = index === slide ? `${prefixClassName}-item-active` : '';
            return (
              <div ref={sliderElementRefs[index]} className={`${styles.componentSliderItem} ${prefixClassName}-item ${activeClassName}`}>
                {React.cloneElement(child, { active: index === slide })}
              </div>
            );
          })}
        </div>
      </div>
      {renderArrow(`${styles.right} ${prefixClassName}-arrow  ${prefixClassName}-arrow-right ${rightArrowDisabledClass}`, slideTo(slide + 1))}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node,
  centerMode: PropTypes.bool,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onChange: PropTypes.func,
  initialSlide: PropTypes.number,
};

Slider.defaultProps = {
  children: null,
  centerMode: false,
  className: '',
  prefixClassName: '',
  onChange: () => {},
  initialSlide: 0,
};

export default Slider;
