import { useState, useEffect } from "react";
import { KEY_CODES } from "constants";

/**
 * Handles the keyboard events for selection and navigation
 * of dropdown options. [Up/Down/Enter/Escape]
 * Also attaches/removes the event listener for keydown on the input
 * passed in the configuration
 * Returns the index of the option to be highlighted
 * @param {Object}    config
 * @param {Object[]}  config.options  List of all options
 * @param {function}  config.onEnter  onEnter callback
 * @param {function}  config.onEscape onEscape callback
 * @param {Object}    config.attachTo the dom ref to attach the listeners to
 * @param {boolean}   config.enabled  whether keyboard select is enabled
 * @returns {number}                  the higlight index of the selected option
 */
export default function useKeyboardSelect({
  options,
  onEnter,
  onEscape,
  attachTo,
  enabled,
}) {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const changeHighlightIndex = newIndex => {
    if (newIndex >= options.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = options.length - 1;
    }
    setHighlightIndex(newIndex);
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case KEY_CODES.DOWN:
        e.preventDefault();
        e.stopPropagation();
        return changeHighlightIndex(highlightIndex + 1);
      case KEY_CODES.UP:
        e.preventDefault();
        e.stopPropagation();
        return changeHighlightIndex(highlightIndex - 1);
      case KEY_CODES.ENTER:
        e.preventDefault();
        e.stopPropagation();
        if (!options[highlightIndex] || options[highlightIndex].isZeroState)
          return onEscape(false);
        return onEnter(options[highlightIndex].value);
      case KEY_CODES.ESC:
        e.preventDefault();
        e.stopPropagation();
        return onEscape(false);
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!attachTo.current || !enabled) return;
    attachTo.current.addEventListener("keydown", handleKeyDown);
    return () => {
      if (!attachTo.current) return;
      attachTo.current.removeEventListener("keydown", handleKeyDown);
    };
  }, [attachTo.current, highlightIndex, options, enabled]);

  return highlightIndex;
}
