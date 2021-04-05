import { colors } from "./colors";

export const textWrapperModes = {
  label: {
    marginTop: 8,
  },
  dropdown: {
    marginTop: 8,
  },
};

export const textInputModes = {
  disabled: {
    opacity: 0.8,
    pointerEvents: "none",
    backgroundColor: colors.grey.neon,
  },
  error: {
    backgroundColor: colors.red.pastel,
    borderColor: colors.red.haptik,
  },
};

export const textInputVariants = {
  dropdown: {
    paddingRight: 38,
    paddingLeft: 12,
    "&:hover": {
      borderColor: colors.grey.haptik,
    },
  },
  dropdownActive: {
    paddingRight: 38,
    paddingLeft: 12,
    borderColor: colors.blue.dark,
    borderBottomColor: "transparent",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropdownActiveTop: {
    paddingRight: 38,
    paddingLeft: 12,
    borderColor: colors.blue.dark,
    borderTopColor: "transparent",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
};
