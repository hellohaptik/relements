import { colors } from "./colors";
import space from "./space";
import radii from "./radii";

export const dropdownOptionsModes = {
  active: {
    opacity: 1,
    transform: "translateY(0px)",
  },
  inactive: {
    opacity: 0,
    transform: "translateY(-4px)",
  },
};

export const dropdownOptionModes = {
  disabled: {
    pointerEvents: "none",
  },
  disabledWithCheckboxSearch: {
    paddingTop: space.zero,
  },
};

export const dropdownOptionVariant = {
  selected: {
    background: colors.blue.pastel,
  },
};

export const dropdownOptionsVariant = {
  withCheckbox: {
    overflow: "initial",
  },
};

export const dropdownOptionsPositionVariant = {
  default: {
    borderBottomRightRadius: radii.sm,
    borderBottomLeftRadius: radii.sm,
  },
  top: {
    borderTopRightRadius: radii.sm,
    borderTopLeftRadius: radii.sm,
  },
};

export const dropdownArrowModes = {
  active: {
    transform: "rotate(180deg)",
  },
};

export const dropdownWithCheckboxInputVariants = {
  dropdown: {
    "&:hover": {
      borderColor: colors.grey.haptik,
    },
  },
  dropdownActive: {
    borderColor: colors.blue.dark,
    borderBottomColor: "transparent",
    borderBottomRightRadius: radii.xs,
    borderBottomLeftRadius: radii.xs,
  },
  dropdownActiveTop: {
    borderColor: colors.blue.dark,
    borderTopColor: "transparent",
    borderTopRightRadius: radii.xs,
    borderTopLeftRadius: radii.xs,
  },
};

export const dropdownCheckboxOptionsModes = {
  withoutSearch: {
    paddingTop: space.lg - space.xs, // "10px"
  },
};

export const dropdownCheckboxSearchWrapperModes = {
  withoutSearch: {
    opacity: 0,
    padding: 0,
    height: 0,
    pointerEvents: "none",
  },
};
