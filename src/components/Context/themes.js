import { rgba } from "@src/utils/generic";

const primaryColors = {
  default: "#204E9C",
};

const themes = {
  default: {
    primaryColor: primaryColors.default,
    fontSize: 14,
    fontFamily: "Roboto, sans-serif",
    button: {
      fontSize: 15,
      borderRadius: 4,
      padding: "10px 16px",
      fontWeight: 500,

      primary: {
        backgroundColor: primaryColors.default,
        color: "#ffffff",
      },

      outline: {
        backgroundColor: rgba(primaryColors.default, 0.1),
        color: primaryColors.default,
      },
    },
  },
};

export default themes;
