import { colors } from "./colors";

export const tooltipColors = {
  primary: {
    color: colors.grey.pastel,
    backgroundColor: colors.blue.dark,
  },
  success: {
    color: colors.grey.pastel,
    backgroundColor: colors.green.haptik,
  },
  danger: {
    color: colors.grey.pastel,
    backgroundColor: colors.red.haptik,
  },
};

export const tooltipArrowColors = {
  primary: {
    bottom: {
      borderBottomColor: colors.blue.dark,
    },
    top: {
      borderTopColor: colors.blue.dark,
    },
  },
  success: {
    bottom: {
      borderBottomColor: colors.green.haptik,
    },
    top: {
      borderTopColor: colors.green.dark,
    },
  },
  danger: {
    bottom: {
      borderBottomColor: colors.red.haptik,
    },
    top: {
      borderTopColor: colors.red.dark,
    },
  },
};

export const tooltipModes = {
  active: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
  inactive: {
    opacity: 0,
    transform: "translate3d(0, 4px, 0)",
  },
};

export const tooltipArrowPositions = {
  bottom: {
    borderTopColor: "transparent !important",
    borderRightColor: "transparent !important",
    borderLeftColor: "transparent !important",
    marginTop: "-11px",
    top: 0,
  },
  top: {
    borderTopColor: "#28394b !important",
    borderRightColor: "transparent !important",
    borderBottomColor: "transparent !important",
    borderLeftColor: "transparent !important",
    marginTop: 0,
    top: "100%",
  },
};

export const tooltipSizes = {
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
