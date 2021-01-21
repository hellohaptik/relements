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
  },
};

export const buttonHover = {
  default: {
    "&:hover": {
      cursor: "pointer",
      transform: "translateY(-1px)",
      boxShadow: "0px 2px 4px 1px rgba(0,0,0,0.15)",
      opacity: 0.8,
    },
  },
  disabled: {
    "&:hover": {
      cursor: "not-allowed",
    },
  },
};

// TODO: Optimize this. Use buttonHover.default as default without specifying variant
buttonHover.primary = buttonHover.default;
buttonHover.success = buttonHover.default;
buttonHover.danger = buttonHover.default;

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
