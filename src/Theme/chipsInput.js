import { colors } from "./colors";
import space from "./space";
import radii from "./radii";

export const chipWrapperModes = {
  chipAdded: {
    padding: `${space.lg - space.sm}px ${space.sm}px ${
      space.zero
    }px ${space.sm - 1}px`, // "6px 8px 0px 7px",
  },
  default: {
    padding: `${space.sm - 1}px ${space.sm}px`, // "7px 8px",
  },
};

export const chipWrapperVariants = {
  dropdown: {
    marginTop: space.sm,
    paddingRight: space.lg + space.md + space.md,
    "&:hover": {
      borderColor: colors.grey.haptik,
    },
  },
  dropdownActive: {
    marginTop: space.sm,
    paddingRight: space.lg + space.md + space.md,
    borderColor: colors.blue.haptik,
    borderBottomColor: "transparent",
    borderBottomRightRadius: radii.xs - radii.xs,
    borderBottomLeftRadius: radii.xs - radii.xs,
  },
  dropdownActiveTop: {
    marginTop: space.sm,
    paddingRight: space.lg + space.md + space.md,
    borderColor: colors.blue.haptik,
    borderTopColor: "transparent",
    borderTopRightRadius: radii.xs - radii.xs,
    borderTopLeftRadius: radii.xs - radii.xs,
  },
};
