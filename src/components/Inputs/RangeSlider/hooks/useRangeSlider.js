import React, { useState, useEffect } from "react";
import { KEY_CODES } from "constants";
import styles from "./useRangeSlider.scss";

export const toPosition = (start, end, step) => knobValue => {
  const value = start + (knobValue / 100) * (end - start);
  return Math.ceil(value / step) * step;
};

export const fromPosition = (start, end) => position => {
  return (100 * (position - start)) / (end - start);
};

export const getKnobPosition = ({ pageX, trackRect }) => {
  let knobPosition = ((pageX - trackRect.left) / trackRect.width) * 100;
  knobPosition = knobPosition < 0 ? 0 : knobPosition;
  knobPosition = knobPosition > 100 ? 100 : knobPosition;
  return knobPosition;
};

export function useRangeSlider({
  value,
  start,
  end,
  onChange,
  step,
  trackRef,
  single,
  onDrag,
  placeholder,
}) {
  const [startPosition, setStartPosition] = useState({});
  const [endPosition, setEndPosition] = useState({});
  const [pointerX, setPointerX] = useState();
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [dragging, setDragging] = useState();
  const translateToPosition = toPosition(start, end, step);
  const translateFromPosition = fromPosition(start, end);
  const startDragging = () => () => setDragging(true);

  const handleDrag = knobType => e => {
    let pageX;
    if (e.target.dragTest) {
      pageX = e.target.pageX;
    } else {
      pageX = e.pageX;
    }
    const trackRect = trackRef.current.getBoundingClientRect();

    if (pageX <= 0) return;

    const knobPosition = getKnobPosition({ pageX, trackRect });
    const knobPositionRounded = knobPosition;

    if (knobType === "start" && knobPosition > endPosition.exact - 1) {
      setPointerX(pageX);
      setStartPosition({ exact: knobPosition, rounded: knobPositionRounded });
      setEndPosition({
        exact: knobPosition + 1,
        rounded: knobPositionRounded + 1,
      });
    } else if (knobType === "end" && knobPosition < startPosition.exact + 1) {
      setPointerX(pageX);
      setStartPosition({
        exact: knobPosition - 1,
        rounded: knobPositionRounded - 1,
      });
      setEndPosition({ exact: knobPosition, rounded: knobPositionRounded });
    } else {
      setPointerX(pageX);
      const setter = knobType === "start" ? setStartPosition : setEndPosition;
      setPointerX(pageX);
      setter({ exact: knobPosition, rounded: knobPositionRounded });
    }

    if (onDrag) {
      onDrag(translateToPosition(knobType, knobPosition));
    }
  };

  const endDrag = knobType => () => {
    const startValue = translateToPosition(startPosition.exact);
    const endValue = translateToPosition(endPosition.exact);

    if (single) onChange(endValue);
    else onChange([startValue, endValue]);

    const setter = knobType === "start" ? setStartPosition : setEndPosition;
    const currentPosition = knobType === "start" ? startPosition : endPosition;
    setPointerX(0);
    setDragging(false);
    setter({
      exact: currentPosition.rounded,
      rounded: currentPosition.rounded,
    });
  };

  const onKnobValueChange = (isStartKnob, knobValue) => {
    if (single) onChange(knobValue);
    else {
      const startValue = translateToPosition(startPosition.exact);
      const endValue = translateToPosition(endPosition.exact);
      isStartKnob
        ? onChange([knobValue, endValue])
        : onChange([startValue, knobValue]);
    }
  };

  const handleKeyDown = knobType => e => {
    const changeKnobPosition = () => {
      const isStartKnob = knobType === "start";
      const setter = isStartKnob ? setStartPosition : setEndPosition;
      let knobPosition = translateFromPosition(e.target.value);
      if (knobPosition < 0) knobPosition = 0;
      if (knobPosition > 100) knobPosition = 100;
      setter({ exact: knobPosition, rounded: knobPosition });

      // calling on change for input field updates
      const knobValue = translateToPosition(knobPosition);
      onKnobValueChange(isStartKnob, knobValue);
    };
    switch (e.keyCode) {
      case KEY_CODES.TAB:
        changeKnobPosition();
        break;
      case KEY_CODES.ENTER:
        e.preventDefault();
        changeKnobPosition();
        break;
      default:
    }
  };

  const handleBlur = (e, knobType) => {
    const isStartKnob = !!(knobType === "start");
    const knobPosition = translateFromPosition(e.target.value);
    const knobValue = translateToPosition(knobPosition);
    onKnobValueChange(isStartKnob, knobValue);
  };

  const renderKnob = (knobType, prefixClassName) => {
    const knobPosition =
      knobType === "start" ? startPosition.exact : endPosition.exact;
    const className = prefixClassName
      ? `${prefixClassName}-${knobType}-knob`
      : "";
    return (
      <div
        style={{ left: `${knobPosition}%` }}
        className={`${styles.sliderKnobWrapper} ${className}`}
      >
        <div
          style={{ left: pointerX }}
          draggable
          onDragStart={startDragging(knobType)}
          onDrag={handleDrag(knobType)}
          onDragEnd={endDrag(knobType)}
          className={styles.sliderKnobGhost}
        />
        <div className={styles.sliderKnob} />
      </div>
    );
  };

  const renderInput = (knobType, prefixClassName) => {
    let inputValue;
    let knobPositionRounded;
    let setter;
    if (knobType === "start") {
      inputValue = startValue.value;
      knobPositionRounded = startPosition.rounded;
      setter = setStartValue;
    } else if (knobType === "end") {
      inputValue = endValue.value;
      knobPositionRounded = endPosition.rounded;
      setter = setEndValue;
    }
    const value =
      inputValue || (!knobPositionRounded && knobPositionRounded !== 0)
        ? inputValue
        : translateToPosition(knobPositionRounded);
    const className = prefixClassName
      ? `${prefixClassName}-${knobType}-input`
      : "";
    return (
      <div className={styles.sliderTextInput}>
        <div className={styles.sliderTextInputLabel}>{knobType}</div>
        <input
          type="text"
          placeholder={placeholder || "enter..."}
          value={value}
          onKeyDown={handleKeyDown(knobType)}
          className={className}
          onChange={e => {
            setter({ value: e.target.value });
          }}
          onBlur={e => {
            handleBlur(e, knobType);
          }}
        />
      </div>
    );
  };

  const setPositions = (start = 0, end) => {
    const knobPositionStart = translateFromPosition(start);
    const knobPositionEnd = translateFromPosition(end);
    setStartPosition({ exact: knobPositionStart, rounded: knobPositionStart });
    setEndPosition({ exact: knobPositionEnd, rounded: knobPositionEnd });
  };

  useEffect(() => {
    single ? setPositions(0, value) : setPositions(value[0], value[1]);
  }, [value, value && value[0], value && value[1]]);

  const trackWidth = endPosition.exact - startPosition.exact;
  return {
    dragging,
    trackWidth,
    trackOffset: startPosition.exact,
    renderKnob,
    renderInput,
  };
}
