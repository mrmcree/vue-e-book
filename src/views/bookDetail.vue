<template>
  <div id="bookDetail">
    <mt-header :title="book.title" class="header" v-show="book.title">
      <div @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="book">
      <img v-lazy="decodeURIComponent(book.cover)" alt class="cover" />

      <div class="book-right">
        <div class="title" v-text="book.title"></div>
        <div class="author" v-text="book.author"></div>
        <div class="codeNum" v-text="book.codeNum"></div>
        <router-link
          :to="{ path: '/chapter', query: { id: book.id } }"
          class="getChapter"
          >全部章节</router-link
        >
      </div>
    </div>
    <div class="content">
      <div class="longIntro" v-text="book.longIntro"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bookDetail",
  data() {
    return {
      book: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  beforeMount() {
    let id = this.$route.query.id;
    // console.log(this.router)
    this.$http({ url: `book-info/${id}` }).then(res => {
      this.book = res.data;
    });
  }
};
</script>
<style scoped lang="scss">
.header {
  background: #000;
  color: #fff;
}
.book {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 130px;
  margin-bottom: 5px;
  padding: 15px 0 15px 20px;
  .chapter {
    text-decoration: none;
  }

  .book-right {
    flex: 1;
    padding: 15px 0 15px 20px;
    font-size: 14px;
    font-weight: bold;
  }
  .cover {
    box-shadow: 0 0 10px #ccc;
    width: 100px;
    height: 130px;
  }
}
.content {
  padding: 0 20px;
  .longIntro {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    margin: 10px 0;

    max-height: 80px;
    overflow: hidden;
  }
}
</style>
