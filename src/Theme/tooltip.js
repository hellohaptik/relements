import { colors } from "./colors";

export const tooltipColors = {
  primary: {
    color: colors.grey.pastel,
    backgroundColor: colors.grey.deep,
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
    top: {
      borderTopColor: colors.grey.deep,
    },
    right: {
      borderRightColor: colors.grey.deep,
    },
    bottom: {
      borderBottomColor: colors.grey.deep,
    },
    left: {
      borderLeftColor: colors.grey.deep,
    },
  },
  success: {
    top: {
      borderTopColor: colors.green.dark,
    },
    right: {
      borderRightColor: colors.green.haptik,
    },
    bottom: {
      borderBottomColor: colors.green.haptik,
    },
    left: {
      borderLeftColor: colors.green.haptik,
    },
  },
  danger: {
    top: {
      borderTopColor: colors.red.dark,
    },
    right: {
      borderRightColor: colors.red.haptik,
    },
    bottom: {
      borderBottomColor: colors.red.haptik,
    },
    left: {
      borderLeftColor: colors.red.haptik,
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
  top: {
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    marginTop: 0,
    top: "100%",
  },
  right: {
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    left: "-6px",
    top: "6px",
  },
  bottom: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    marginTop: "-11px",
    top: 0,
  },
  left: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    left: "100%",
    margin: "0 0 0 -1px",
    top: "6px",
  },
};

export const tooltipSizes = {
  small: {
    fontSize: 10,
    paddingX: "sm",
    paddingY: "xs",
  },
  regular: {
    fontSize: 12,
    paddingX: "sm",
    paddingY: "xs",
  },
  large: {
    fontSize: 16,
    paddingX: "md",
    paddingY: "sm",
  },
};
