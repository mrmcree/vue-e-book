<template>
  <div
    class="book"
    :style="{ color: theme.color, background: theme.background }"
  >
    <div
      class="container"
      ref="wrapper"
      style="height:100vh;overflow:hidden;postion:fiex;top:0;"
    >
      <ul ref="content" class="wrapper">
        <li
          v-for="(item, index) in bookDetail"
          :key="index"
          :data-name="item.chapter + item.title"
          @scroll.native="chapterScroll"
        >
          <div class="nav">
            <div class="title" v-text="item.title"></div>
            <div class="chapter" v-text="item.chapter"></div>
          </div>
          <div
            class="content"
            v-html="item.content"
            @click="toolBarShow = true"
            ref="page"
          ></div>
        </li>
      </ul>
      <div id="page"></div>
    </div>
    <div class="toolBar" v-show="toolBarShow">
      <mt-header :title="bookTitle" class="header">
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
          :min="10"
          :max="50"
          :step="5"
          :bar-height="3"
          style="width:80%;margin:0 auto;"
        >
          <div
            slot="start"
            @click="fontSize > 10 ? (fontSize -= 5) : (fontSize = 10)"
          >
            aa&nbsp;&nbsp;
          </div>
          <div
            slot="end"
            @click="fontSize < 50 ? (fontSize += 5) : (fontSize = 50)"
          >
            &nbsp;&nbsp;AA
          </div>
        </mt-range>
        <div class="theme-select">
          <div
            class="theme"
            v-for="(item, index) in themes"
            :key="index"
            @click="changeSkin(item)"
          >
            {{ index | format }}
          </div>
        </div>
        <!-- <div class="chapter-select">
          <mt-button type="primary" class="btn" size="small" @click="prev">上一章</mt-button>
          <div class="pageNum">{{ book.chapter }}</div>
          <mt-button type="primary" class="btn" size="small" @click="next">下一章</mt-button>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
//TODO:更多换肤
import BScroll from "better-scroll";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "book",
  data() {
    return {
      fontSize: 10,
      toolBarShow: false,
      contentScroll: undefined,
      el: document.querySelectorAll(".wrapper li"),
      themes: {},
      theme: {}
    };
  },
  filters: {
    format(value) {
      switch (value) {
        case "classic":
          value = "经典";
          break;
        case "dark":
          value = "夜间";
          break;
        case "light":
          value = "清新";
          break;
        default:
          value = "默认";
      }
      return value;
    }
  },
  watch: {
    fontSize(newVal) {
      document.querySelector(".container").style.fontSize = newVal + "px";
      document.querySelector(".container").style.lineHeight =
        newVal * 1.2 + "px";
    },
    bookDetail() {
      this.el = document.querySelectorAll(".wrapper li");
    }
  },
  methods: {
    next() {
      this.getBookDetail({
        url: this.bookDetail[this.bookDetail.length - 1].next,
        route: this.$route
      });
      // this.getData();
    },
    prev() {
      this.getBookDetail({
        url: this.bookDetail[this.bookDetail.length - 1].prev,
        route: this.$route
      });
    },
    changeSkin(theme) {
      this.theme = theme;
    },
    ...mapActions(["getBookDetail"]),
    ...mapMutations({
      changeTitle: "CHANGE_BOOK_TITLE"
    })
  },
  beforeMount() {
    this.theme = this.bookThemes.default;
    this.themes = this.bookThemes;
    this.getBookDetail({
      route: this.$route
    });
  },
  computed: {
    ...mapGetters(["bookThemes", "bookDetail", "bookTitle"])
  },
  mounted() {
    // 滚动修改标题
    this.$nextTick(() => {
      if (this.contentScroll) return;
      this.contentScroll = new BScroll(this.$refs.wrapper, {
        click: true,
        bounce: {
          top: true,
          bottom: true,
          left: false,
          right: false
        },

        pullUpLoad: {
          // 当上拉距离超过30px时触发 pullingUp 事件
          threshold: 30
        }
      });

      this.contentScroll.on("scroll", pos => {
        var top = Math.abs(pos.y);
        var el = this.el;
        for (var i = 0; i < el.length; i++) {
          if (top > el[i].offsetTop) {
            this.changeTitle(el[i].getAttribute("data-name"));
          }
        }
      });
      this.contentScroll.on(
        "pullingUp",
        () => {
          setTimeout(() => {
            // console.log("上拉加载操作");
            // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
            this.next();
            this.contentScroll.finishPullUp();
            this.contentScroll.refresh();
          });
        },
        1000
      );
    });
  }
};
</script>
<style scoped lang="scss">
.book {
  color: var(--theme-font-color);
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
    .theme-select {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
      height: 50px;
      line-height: 50px;
    }
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
.bottom-tip {
  color: red;
}
</style>
