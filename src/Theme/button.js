import { colors } from "./colors";
import borderWidths from "./borderWidths";

export const buttonColors = {
  primary: {
    color: colors.grey.pastel,
    backgroundColor: colors.blue.dark,
  },
  secondary: {
    color: colors.blue.dark,
    backgroundColor: colors.grey.pastel,
    borderWidth: borderWidths.xs,
    borderColor: colors.blue.dark,
  },
  danger: {
    color: colors.red.deep,
    backgroundColor: colors.red.pastel,
    borderWidth: borderWidths.xs,
    borderColor: colors.red.deep,
  },
  warning: {
    color: colors.yellow.deep,
    backgroundColor: colors.yellow.pastel,
    borderWidth: borderWidths.xs,
    borderColor: colors.yellow.deep,
  },
  disabled: {
    color: colors.grey.haptik,
    backgroundColor: colors.grey.soft,
    borderWidth: borderWidths.xs,
    borderColor: colors.grey.haptik,
    "&:hover": {
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
};

export const buttonSizes = {
  small: {
    fontSize: "1",
  },
  medium: {
    fontSize: "2",
  },
  large: {
    fontSize: "3",
  },
};
