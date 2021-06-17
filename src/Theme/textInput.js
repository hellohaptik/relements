import { colors } from "./colors";
import space from "./space";

export const textWrapperModes = {
  label: {
    marginTop: space.sm,
  },
  dropdown: {
    marginTop: space.sm,
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
    paddingRight: space.lg + space.md + space.md,
    paddingLeft: space.md,
    "&:hover": {
      borderColor: colors.grey.haptik,
    },
  },
  dropdownActive: {
    paddingRight: space.lg + space.md + space.md,
    paddingLeft: space.md,
    borderColor: colors.blue.haptik,
    borderBottomColor: "transparent",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropdownActiveTop: {
    paddingRight: space.lg + space.md + space.md,
    paddingLeft: space.md,
    borderColor: colors.blue.haptik,
    borderTopColor: "transparent",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
};

export const textInputSize = {
  small: {
    padding: `${space.sm}px ${space.lg - space.sm}px`,
  },
};
