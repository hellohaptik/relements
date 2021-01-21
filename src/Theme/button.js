import colors from "./colors";

export const buttonColors = {
  primary: {
    color: colors.white,
    backgroundColor: colors.blue.haptik,
  },
  success: {
    color: colors.white,
    backgroundColor: colors.green.haptik,
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.red.haptik,
  },
  disabled: {
    color: colors.white,
    backgroundColor: colors.grey.haptik,
    "&:hover": {
      cursor: "not-allowed",
    },
  },
};

export const buttonSizes = {
  small: {
    fontSize: "xs",
    paddingX: "sm",
    paddingY: "xs",
  },
  regular: {
    fontSize: "sm",
    paddingX: "md",
    paddingY: "sm",
  },
  large: {
    fontSize: "md",
    paddingX: "lg",
    paddingY: "md",
  },
};
