import { colors } from "./colors";

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
    opacity: 0.5,
    pointerEvents: "none",
  },
};

export const dropdownOptionsVariant = {
  withCheckbox: {
    overflow: "initial",
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
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
};
