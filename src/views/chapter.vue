<template>
  <div class="chapter container">
    <ul class="chapters">
      <li class="item" v-for="(item, index) in chapters" :key="index">
        <router-link :to="{ path: '/book', query: { link: item.link } }"
          ><div class="title" v-text="item.chapter"></div
        ></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  name: "chapter",
  data() {
    return {
      chapters: []
    };
  },
  beforeMount() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    let id = this.$route.query.id;
    this.$http.get(`${this.$host}book-chapter/${id}`).then(res => {
      this.chapters = res.data;
      // console.log(this.chapters);
      Indicator.close();
    });
  }
};
</script>
<style scoped lang="scss">
.chapters {
  list-style: none;
  font-size: 14px;
  a {
    text-decoration: none;
    display: block;
    color: black;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
