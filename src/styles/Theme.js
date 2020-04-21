const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

export default {
  // size

  // width
  width: {
    container: "1200px",
    gutter: "24px",
    column: "72px",
    containerPadding: "36px",
    card: "360px",

    colunms: [
      "75rem", // 0 column - 1200px
      "70.5rem", // 1 column - 1128px
      "34.5rem", // 2 column - 552px
      "22.5rem", // 3 column - 360px
      "16.5rem", // 4 column - 264px
      "16.5rem",
      "10.5rem", // 6 column - 168px
      "4.5rem", // 12 column - 72px
    ],
  },

  // color
  color: {
    bg: "white",
    gray: [
      "#ffffff",
      "#fafafa",
      "#f5f5f5",
      "#e8e8e8",
      "#d9d9d9",
      "#bfbfbf",
      "#8C8C8C",
      "#595959",
      "#262626",
      "#000000",
    ],
    primary: ["#4652DC", "#A6B0FE", "#7F89E3", "#5B63A3", "#383C63"],
    yellow: "#FFE500",
    yellowDark: "#ECCE34",
    green: "#006666",
    cyan: "#04CECE",
    red: "#FF1A40",
  },

  // whiteBox
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `border:${BOX_BORDER};
             border-radius:${BORDER_RADIUS};
             background-color:white;
            `,
};
