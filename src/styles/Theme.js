const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

export default {
  // size
  maxWidth: "1920px",
  cardWidth: "360px",
  minPageWidth: "360px",

  // color
  color: {
    bg: "white",
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef", // background color
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
    cyan: [
      "#e3fafc",
      "#c5f6fa",
      "#99e9f2",
      "#66d9e8",
      "#3bc9db",
      "#22b8cf",
      "#15aabf",
      "#1098ad",
      "#0c8599",
      "#0b7285",
    ],
  },

  // whiteBox
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `border:${BOX_BORDER};
             border-radius:${BORDER_RADIUS};
             background-color:white;
            `,
};
