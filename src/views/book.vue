<template>
  <div class="book">
    <div class="container">
      <div class="nav">
        <div class="title" v-text="book.title"></div>
        <div class="chapter" v-text="book.chapter"></div>
      </div>
      <div
        class="content"
        ref="content"
        v-html="book.content"
        @click="toolBarShow = true"
      ></div>
    </div>
    <div class="toolBar" v-show="toolBarShow">
      <mt-header :title="book.title" class="header">
        <div @click="$router.go(-1)" slot="left">
          <mt-button icon="back">返回</mt-button>
        </div>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <div class="space" @click="toolBarShow = false"></div>
      <div class="footer">
        <!-- <input type="color" @change="changeFontSkin" v-model="fontColor">
        <input type="color" @change="changeBgSkin" v-model="bgColor">-->
        <mt-range
          class="fontSizeSelect"
          v-model="fontSize"
          :min="12"
          :max="50"
          :step="5"
          :bar-height="3"
          style="width:80%;margin:0 auto;"
        >
          <div slot="start">aa&nbsp;&nbsp;</div>
          <div slot="end">&nbsp;&nbsp;AA</div>
        </mt-range>
        <div class="chapter-select">
          <mt-button type="primary" class="btn" size="small" @click="prev"
            >上一章</mt-button
          >
          <div class="pageNum">{{ book.chapter }}</div>
          <mt-button type="primary" class="btn" size="small" @click="next"
            >下一章</mt-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  name: "book",
  data() {
    return {
      book: [],
      fontColor: "",
      bgColor: "",
      lineHeight: 12,
      letterSpacing: "0px",
      fontSize: 12,
      toolBarShow: false
    };
  },
  watch: {
    fontSize(newVal) {
      this.$refs.content.style.fontSize = newVal + "px";
      this.$refs.content.style.lineHeight = newVal * 1.2 + "px";
    }
  },
  methods: {
    next() {
      this.getData(this.book.next);
    },
    prev() {
      this.getData(this.book.prev);
    },
    changeBgSkin() {
      document.documentElement.style.setProperty(
        "--theme-background-color",
        this.bgColor
      );
    },
    changeFontSkin() {
      document.documentElement.style.setProperty(
        "--theme-font-color",
        this.fontColor
      );
    },
    getData(url) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      let link = encodeURIComponent(this.$route.query.link);
      if (url) {
        link = encodeURIComponent(url);
      }
      this.$http.get(`${this.$host}book/${link}`).then(res => {
        this.book = res.data;
        Indicator.close();
      });
    }
  },
  beforeMount() {
    this.getData();
  },
  mounted() {
    this.$refs.content.style.fontSize = this.fontSize + "px";
    this.$refs.content.style.lineHeight = this.fontSize * 1.2 + "px";
    this.$refs.content.style.letterSpacing = this.letterSpacing;
  }
};
</script>
<style scoped lang="scss">
.book {
  color: var(--theme-font-color);
  background: url("/skin/skin-default.jpg");
}
.toolBar {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  .header {
    background: #000;
    color: #fff;
  }
  .space {
    width: 100%;
    height: calc(100vh - 140px);
  }
  .footer {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: #000;
    color: #fff;
    .fontSizeSelect {
      padding: 10px 0;
    }
    .chapter-select {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
    }
    .btn {
      font-size: 14px;
      background: #000;
      color: #fff;
    }
  }
}
.nav {
  padding-top: 20px;
  .title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
  .chapter {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
