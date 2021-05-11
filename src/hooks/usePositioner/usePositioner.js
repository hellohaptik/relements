import { useState, useEffect } from "react";

import { POSITIONER_CONSTANTS } from "./constants";

export default function usePositioner({
  attachTo,
  attachee,
  position = "TOP",
  offset,
}) {
  const [value, setValue] = useState({});
  useEffect(() => {
    if (!attachTo.current || !attachee.current) return;

    const rect = attachTo.current.getBoundingClientRect();
    const tooltipRect = attachee.current.getBoundingClientRect();
    const coordinates = {};

    switch (position) {
      case "TOP": {
        coordinates.top =
          rect.top - tooltipRect.height - POSITIONER_CONSTANTS.OFFSET.TOP;
        coordinates.left = rect.left - tooltipRect.width / 2 + rect.width / 2;
        coordinates.arrowCoords = {
          left:
            tooltipRect.width > POSITIONER_CONSTANTS.MAX_TOOLTIP_WIDTH
              ? rect.left
              : POSITIONER_CONSTANTS.ARROW.DEFAULT,
        };
        break;
      }

      case "RIGHT": {
        coordinates.top = rect.top - tooltipRect.height / 2 + rect.height / 2;
        coordinates.left = rect.right + POSITIONER_CONSTANTS.OFFSET.RIGHT;
        coordinates.arrowCoords = {
          left: POSITIONER_CONSTANTS.ARROW.RIGHT,
        };
        break;
      }

      case "BOTTOM": {
        coordinates.top = rect.bottom + POSITIONER_CONSTANTS.OFFSET.BOTTOM;
        coordinates.left = rect.left - tooltipRect.width / 2 + rect.width / 2;
        coordinates.arrowCoords = {
          left:
            tooltipRect.width > POSITIONER_CONSTANTS.MAX_TOOLTIP_WIDTH
              ? rect.left
              : POSITIONER_CONSTANTS.ARROW.DEFAULT,
        };
        break;
      }

      case "LEFT": {
        coordinates.top = rect.top - tooltipRect.height / 2 + rect.height / 2;
        coordinates.left =
          rect.left - tooltipRect.width - POSITIONER_CONSTANTS.OFFSET.LEFT;
        coordinates.arrowCoords = {
          left: POSITIONER_CONSTANTS.ARROW.FULL,
        };
        break;
      }

      default: {
        coordinates.top = rect.bottom + POSITIONER_CONSTANTS.OFFSET.BOTTOM;
        coordinates.left = rect.left - tooltipRect.width / 2 + rect.width / 2;
        coordinates.arrowCoords = {
          left:
            tooltipRect.width > POSITIONER_CONSTANTS.MAX_TOOLTIP_WIDTH
              ? rect.left
              : POSITIONER_CONSTANTS.ARROW.DEFAULT,
        };
      }
    }

    let leftDiff = rect.left + rect.width / 2 - tooltipRect.width / 2 - 8;
    let rightDiff =
      window.innerWidth -
      (rect.left + rect.width / 2 + tooltipRect.width / 2) -
      8;

    if (leftDiff < 0) {
      coordinates.left -= leftDiff;
    } else {
      leftDiff = 0;
    }

    if (rightDiff < 0) {
      coordinates.left += rightDiff;
    } else {
      rightDiff = 0;
    }

    if (offset && offset.left) {
      coordinates.left += offset.left;
    }

    if (offset && offset.top) {
      coordinates.top += offset.top;
    }

    setValue(coordinates);
  }, [attachTo.current, attachee.current]);

  return value;
}
