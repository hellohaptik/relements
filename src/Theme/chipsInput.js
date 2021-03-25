import { colors } from "./colors";

export const chipWrapperModes = {
  chipAdded: {
    padding: "6px 8px 0px 7px",
  },
  default: {
    padding: "7px 8px",
  },
};

export const chipWrapperVariants = {
  dropdown: {
    marginTop: 8,
    paddingRight: "38px !important",
    "&:hover": {
      borderColor: colors.grey.haptik,
    },
  },
  dropdownActive: {
    marginTop: 8,
    paddingRight: "38px !important",
    borderColor: colors.blue.dark,
    borderBottomColor: "transparent",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
};
