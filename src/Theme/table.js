import borderWidths from "./borderWidths";
import { colors } from "./colors";

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

export const tableRowBackground = {
  default: {
    backgroundColor: "inherit",
  },
  alternate: {
    "& > div:last-child > div": {
      "&:nth-child(even)": {
        backgroundColor: colors.grey.soft,
      },
    },
  },
};
