import { colors } from "./colors";
import borderWidths from "./borderWidths";

export const checkboxColors = {
    primary: {
        borderColor: colors.blue.dark,
        backgroundColor: colors.blue.dark,
        borderWidth: borderWidths.xs,
    },
    disabled: {
        backgroundColor: colors.grey.deep,
        borderColor: colors.grey.deep,
        borderWidth: borderWidths.xs,
        "&:hover": {
          cursor: "not-allowed",
        },
    },
}