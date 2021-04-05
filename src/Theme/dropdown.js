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
    pointerEvents: "none",
  },
};

export const dropdownOptionsVariant = {
  withCheckbox: {
    overflow: "initial",
  },
};

export const dropdownOptionsPositionVariant = {
  default: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  top: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
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
  dropdownActiveTop: {
    borderColor: colors.blue.dark,
    borderTopColor: "transparent",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
};

export const dropdownCheckboxOptionsModes = {
  withoutSearch: {
    paddingTop: 10,
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
