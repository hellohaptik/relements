import colors from "./colors";
import fontSizes from "./fontSizes";
import space from "./space";

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

export const buttonSizes = {
  small: {
    fontSize: fontSizes.xs,
    paddingX: space.sm,
    paddingY: space.xs,
  },
  regular: {
    fontSize: fontSizes.sm,
    paddingX: space.md,
    paddingY: space.sm,
  },
  large: {
    fontSize: fontSizes.md,
    paddingX: space.lg,
    paddingY: space.md,
  },
};
