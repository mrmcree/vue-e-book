<template>
  <div class="categories">
    <mt-header
      :title="this.$route.query.name"
      class="header"
      v-show="books.length > 0"
    >
      <router-link to="/rank" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="container">
      <ul class="books">
        <li class="book" v-for="(item, index) in books" :key="index">
          <router-link :to="{ path: '/bookDetail', query: { id: item.id } }">
            <img
              v-lazy="decodeURIComponent(item.cover)"
              class="cover"
              :key="decodeURIComponent(item.cover)"
            />
          </router-link>
          <div class="book-right">
            <div class="title" v-text="item.title"></div>
            <div class="shortIntro" v-text="item.shortIntro"></div>
            <div class="author" v-text="item.author"></div>
            <!-- <div class="tags">
            <div class="tag" v-for="(item,index) in item.tags" :key="index">{{item}}</div>
            </div>-->
          </div>
        </li>
      </ul>
      <div class="footer" v-show="books.length > 0">
        <mt-button type="primary" class="btn" size="small" @click="prev"
          >上一页</mt-button
        >
        <div class="pageNum">{{ page }}</div>
        <mt-button type="primary" class="btn" size="small" @click="next"
          >下一页</mt-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "categories",

  data() {
    return {
      books: [],
      page: 1,
      name: ""
    };
  },
  methods: {
    next() {
      this.page++;
      this.getData(this.page);
    },
    prev() {
      this.page--;
      if (this.page <= 1) {
        this.page = 1;
      }
      this.getData(this.page);
      // console.log(this.books);
    },
    getData(page = 1) {
      let { major, type } = this.$route.query;
      this.name = this.$route.query.name;
      this.$http({
        url: `category-info?gender=${type}&type=hot&major=${major}&page=${page}`
      }).then(res => {
        this.books = res.data;
      });
    }
  },
  computed: {},
  beforeMount() {
    this.getData();
  }
};
</script>
<!-- */es-lint disable */ -->
<style scoped lang="scss">
.categories {
  .container {
    padding-top: 20px;
  }
  .header {
    background: #000;
    color: #fff;
  }
  .footer {
    padding: 0 15px;

    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    .btn {
      font-size: 14px;
      color: var(--theme-font-color);
      background-color: var(--theme-background-color);
    }
    .pageNum {
      color: red;
    }
  }

  .books {
    .book {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      height: 130px;
      margin-bottom: 5px;

      .book-right {
        flex: 1;
        padding: 15px 0 15px 20px;
        .title {
          font-size: 14px;
          font-weight: bold;
        }

        .shortIntro {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          margin: 10px 0;

          max-height: 80px;
          overflow: hidden;
        }
        .author {
          font-size: 14px;
          font-weight: bold;
        }
        .tags {
          display: flex;
          font-size: 8px;
        }
      }

      .cover {
        box-shadow: 0 0 10px #ccc;
        width: 100px;
        height: 130px;
      }
    }
  }
}
</style>
