import { colors } from "./colors";
import space from "./space";

export const checkboxWrapperModes = {
  stacked: {
    display: "block",
  },
  inline: {
    display: "flex",
  },
};

export const checkboxWrapperVariants = {
  withLabel: {
    marginTop: space.sm,
  },
};

export const checkboxItemWrapperModes = {
  stacked: {
    padding: 0,
    marginBottom: space.md,
    marginRight: 0,
  },
  inline: {
    padding: 0,
    marginBottom: 0,
    marginRight: space.md,
  },
};

export const checkboxVariants = {
  primary: {
    borderColor: colors.blue.dark,
  },
  disabled: {
    borderColor: colors.grey.deep,
  },
};
