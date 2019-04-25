export default {
  //@阅读主题 bookThemes
  book: {
    detail: [],
    title: "",
    themes: {
      classic: {
        color: "#000",
        background: `url(${require("../../public/skin/skin-default.jpg")})`
      },
      dark: {
        color: "#fff",
        background: "#000"
      },
      light: {
        color: "#000",
        background: `url(${require("../../public/skin/skin-light.jpg")})`
      },
      default: {
        color: "#000",
        background: "#fff"
      }
    }
  }
};
