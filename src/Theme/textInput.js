import { colors } from "./colors";
import space from "./space";
import radii from "./radii";

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
    borderColor: colors.blue.dark,
    borderBottomColor: "transparent",
    borderBottomRightRadius: radii.sm - radii.sm,
    borderBottomLeftRadius: radii.sm - radii.sm,
  },
  dropdownActiveTop: {
    paddingRight: space.lg + space.md + space.md,
    paddingLeft: space.md,
    borderColor: colors.blue.dark,
    borderTopColor: "transparent",
    borderTopRightRadius: radii.sm - radii.sm,
    borderTopLeftRadius: radii.sm - radii.sm,
  },
};
