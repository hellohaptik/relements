import borderWidths from "./borderWidths";

export const tableBorder = {
  withBorder: {
    borderWidth: borderWidths.xs,
  },
  noBorder: {
    borderWidth: borderWidths.zero,
  },
};

export const tableSpace = {
  default: {
    px: "md",
    py: "sm",
  },
  compact: {
    px: "sm",
    py: "xs",
  },
};
