import React, { useState, useEffect } from "react";
import { KEY_CODES } from "constants";
import styles from "./useRangeSlider.scss";

/**
 * returns a function that takes exact knob position as a parameter and returns rounded range value.
 * @param {number} start start value from props
 * @param {number} end end value from props
 * @param {number} step step value from props
 * @returns {number}
 */
export const toPosition = (start, end, step) => position => {
  const value = start + (position / 100) * (end - start);
  return Math.round(value / step) * step;
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
  startPlaceholder,
  endPlaceholder,
  renderInputValue,
  translateInputValue,
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
      onDrag(translateToPosition(knobPosition));
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

  const onKnobValueChange = (isStartKnob, knobValue, knobPosition) => {
    let newValue = knobValue;
    let newPosition = knobPosition;

    if (knobValue > end) newValue = end;
    if (knobValue < 0) newValue = 0;
    if (newPosition > 100) newPosition = 100;
    if (newPosition < 0) newPosition = 0;

    const setter = isStartKnob
      ? { setValue: setStartValue, setPosition: setStartPosition }
      : { setValue: setEndValue, setPosition: setEndPosition };
    setter.setValue(newValue);
    setter.setPosition({ exact: newPosition, rounded: newPosition });

    if (single) onChange(newValue);
    else {
      const startValue = translateToPosition(startPosition.exact);
      const endValue = translateToPosition(endPosition.exact);
      isStartKnob
        ? onChange([newValue, endValue])
        : onChange([startValue, newValue]);
    }
  };

  /**
   * calculates knob position and knob value and passes it to the onKnobValueChange function
   * @param {string} knobType type of knob (start or end)
   * @param {string} value range value
   */
  const changeKnobPosition = (knobType, value) => {
    const isStartKnob = knobType === "start";
    const knobPosition = translateFromPosition(value);
    const knobValue = translateToPosition(knobPosition);
    onKnobValueChange(isStartKnob, knobValue, knobPosition);
  };

  /**
   * returns a function that takes value and keyDown event as parameter to change knob position
   * @param {string} knobType type of knob (start or end)
   */
  const handleKeyDown = knobType => (value, e) => {
    switch (e.keyCode) {
      case KEY_CODES.ESC:
      case KEY_CODES.TAB:
        changeKnobPosition(knobType, value);
        break;
      case KEY_CODES.ENTER:
        e.preventDefault();
        changeKnobPosition(knobType, value);
        break;
      default:
    }
  };

  /**
   * returns a function that accepts a value parameter to change knob position
   * @param {string} knobType type of knob (start or end)
   */
  const handleBlur = knobType => value => changeKnobPosition(knobType, value);

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

  /**
   * A custom hook returns value, setter and inputPlaceholder of a knob based on knob type.
   * @param {string} knobType type of knob (start or end)
   * @returns {[number, function, string]} value, setter, inputPlaceholder
   */
  const useValue = knobType => {
    let inputValue;
    let knobPositionRounded;
    let setter;
    let inputPlaceholder;
    if (knobType === "start") {
      inputValue = startValue.value;
      knobPositionRounded = startPosition.rounded;
      setter = setStartValue;
      inputPlaceholder = startPlaceholder || knobType;
    } else if (knobType === "end") {
      inputValue = endValue.value;
      knobPositionRounded = endPosition.rounded;
      setter = setEndValue;
      inputPlaceholder = endPlaceholder || knobType;
    }
    const value =
      inputValue || (!knobPositionRounded && knobPositionRounded !== 0)
        ? inputValue
        : translateToPosition(knobPositionRounded);
    return [value, setter, inputPlaceholder];
  };

  const renderInput = (knobType, prefixClassName) => {
    const [value, setter, inputPlaceholder] = useValue(knobType);
    const [renderValue, setRenderValue] = useState();

    useEffect(() => {
      if (value !== undefined) {
        setRenderValue(renderInputValue ? renderInputValue(value) : value);
      }
    }, [value]);

    const className = prefixClassName
      ? `${prefixClassName}-${knobType}-input`
      : "";

    /**
     * returns a wrapped function that accepts keyDown event as a parameter
     * @param {function} wrapped event handler to be wrapped
     */
    const reflectKeyPressedWrapper = wrapped => e => {
      if (
        e.keyCode === KEY_CODES.ESC ||
        e.keyCode === KEY_CODES.TAB ||
        e.keyCode === KEY_CODES.ENTER
      )
        wrapped(e);
    };

    /**
     * event handler wrapper takes event handler as an input
     * returns a function that takes event as a parameter and
     * reflects the knob value and render input value by invoking the handler as a callback function
     * @param {function} handler event handler that takes event as an input
     * @author Swapnil Misal <swapnil.misal@gmail.com>
     */
    const reflectInput = handler => e => {
      const isIntegerOnly = Number.isInteger(step);
      const isIntegerInput = Number.isInteger(parseFloat(renderValue));
      const isFloatInput = !Number.isNaN(parseFloat(renderValue));
      const isTranslatedInput = translateInputValue && renderInputValue;
      const currentValue = value;

      // resets to previous valid value for invalid inputs
      /**
       * returns converted value based on expected input if required otherwise returns previous valid value
       * @param {string} value
       * @returns {number}
       * @author Swapnil Misal <swapnil.misal@gmail.com>
       */
      const convertInputValue = value => {
        if (isIntegerOnly && isIntegerInput) return parseInt(value, 10);
        if (!isIntegerOnly && isFloatInput) return value;
        return currentValue;
      };

      // value from input text box is converted to range value
      const inputValue = isTranslatedInput
        ? translateInputValue(renderValue, currentValue)
        : convertInputValue(renderValue);

      // range value is converted to a representational value to be displayed in the input box
      const currentRenderValue = isTranslatedInput
        ? renderInputValue(currentValue)
        : currentValue;

      /**
       * handles invalid input cases by returning fallback values
       *  1. Invalid float :- returns previous valid value
       *  2. Partially valid:- applicable for representational input only returns input value
       *  3. Empty :- returns previous valid value and its representation
       *  4. Out of range :- returns capped range values e.g start or end
       *  5. start input box hits or crosses end prop :- returns value of start prop
       *  6. end input box hits or crosses start prop :- returns value of end prop
       *  7. start input box hits or crosses end input box :- returns previous valid value
       *  8. end input box hits or crosses start input box :- returns previous valid value
       *  9. valid input value :- returns input value
       * returns a pair of range value and its representation in the input box
       * @returns {array}
       * @author Swapnil Misal <swapnil.misal@gmail.com>
       */
      const handleInvalidInput = () => {
        const isInValidFloatInput =
          !isIntegerOnly && !Number.isInteger(inputValue / step);

        if (isInValidFloatInput) return [currentValue, currentRenderValue];

        // only for custom input where some partial representation is of equal value to the current value
        const isPartiallyValidInput =
          isTranslatedInput &&
          currentValue === inputValue &&
          currentRenderValue !== renderValue;
        if (isPartiallyValidInput) return [inputValue, currentRenderValue];

        // empty input resets to previous valid input
        const isEmptyInput = !isTranslatedInput && inputValue === "";
        if (isEmptyInput) return [currentValue, currentRenderValue];

        // out of range values capped to start or end values depends on bound violation
        const isNumberInput = !Number.isNaN(Number(inputValue));
        const hitsLowerBound = isNumberInput && inputValue < start;
        const hitsUpperBound = isNumberInput && inputValue > end;

        /**
         * returns capped value for range violating input
         * @returns {number}
         * @author Swapnil Misal <swapnil.misal@gmail.com>
         */
        const capInput = () => {
          if (hitsLowerBound && single) return start;
          if (hitsUpperBound) return knobType === "start" ? currentValue : end;
          if (hitsLowerBound) return knobType === "end" ? currentValue : start;
          return inputValue;
        };
        const cappedInput = capInput();

        // checks if input value hits start or end bounds provided by props
        if (hitsLowerBound || hitsUpperBound)
          if (isTranslatedInput)
            // checks if translation of the value is required
            return [cappedInput, renderInputValue(cappedInput)];
          else return [cappedInput, cappedInput];

        // check for invalid integer input
        const isInValidIntInput = isIntegerOnly && inputValue % step !== 0;
        if (isInValidIntInput) return [currentValue, currentRenderValue];

        // ensures start input does not cross or equates to end input and vice versa
        const hitsStart =
          knobType === "start" &&
          !single &&
          Math.round(inputValue) >= translateToPosition(endPosition.rounded);

        const hitsEnd =
          knobType === "end" &&
          !single &&
          Math.round(inputValue) <= translateToPosition(startPosition.rounded);

        if (hitsStart || hitsEnd) return [currentValue, currentRenderValue];
        if (isTranslatedInput) return [inputValue, renderValue];
        return [inputValue, inputValue];
      };

      const shouldUpdateValue = newValue => newValue !== value;
      const shouldUpdateRenderValue = newRenderValue =>
        newRenderValue !== renderValue;
      const updateValue = value => {
        setter({ value });
        handler(value, e);
      };
      const [newValue, newRenderValue] = handleInvalidInput();
      shouldUpdateValue(newValue) && updateValue(newValue);
      shouldUpdateRenderValue(newRenderValue) && setRenderValue(newRenderValue);
    };

    /*
      handleKeyDown returns a function that handles onKeyDown event for a knob type.
      reflectInput takes function returned by handleKeyDown function as a parameter
      and returns event handler that takes event as a parameter.
      reflectKeyPressedWrapper takes event handler returned by reflect input as a parameter
      and returns a wrapped event handler, event handler is invoked when reflect input keys pressed.
      reflect input keys are TAB, ENTER and ESC
    */
    const onKeyDown = reflectKeyPressedWrapper(
      reflectInput(handleKeyDown(knobType)),
    );

    /*
      handleBlur returns a function that handles onBlur event for a knob type.
      reflectInput takes function returned by handleBlur function as a parameter
      and returns event handler that takes event as a parameter.
    */
    const onBlur = reflectInput(handleBlur(knobType));

    const onChange = e => setRenderValue(e.target.value);

    return (
      <div className={styles.sliderTextInput}>
        <div className={styles.sliderTextInputLabel}>{inputPlaceholder}</div>
        <input
          type="text"
          placeholder={placeholder || "enter..."}
          value={renderValue}
          onKeyDown={onKeyDown}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
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
