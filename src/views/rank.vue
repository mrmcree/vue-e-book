<template>
  <div id="rank">
    <div class="container">
      <h2 v-show="male.length > 0">male</h2>
      <ul class="item-wrapper">
        <li class="item" v-for="(item, index) in male" :key="index">
          <router-link
            :to="{
              path: '/categories',
              query: { major: item.major, type: 'male', name: item.name }
            }"
          >
            <img
              class="bookCover"
              v-lazy="decodeURIComponent(item.cover)"
              alt
            />
          </router-link>
          <div class="title" v-html="item.name"></div>
          <!-- <div class="count" v-html="item.bookCount"></div>
        <div class="monthlyCount" v-html="'月票'+item.monthlyCount"></div>-->
        </li>
      </ul>
      <h2 v-show="female.length > 0">female</h2>
      <ul class="item-wrapper">
        <li class="item" v-for="(item, index) in female" :key="index">
          <router-link
            :to="{
              path: '/categories',
              query: { major: item.major, type: 'female', name: item.name }
            }"
          >
            <img
              class="bookCover"
              v-lazy="decodeURIComponent(item.cover)"
              alt
            />
          </router-link>
          <div class="title" v-html="item.name"></div>
          <!-- <div class="count" v-html="item.bookCount"></div>
        <div class="monthlyCount" v-html="'月票'+item.monthlyCount"></div>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  name: "rank",
  data() {
    return {
      female: [],
      male: []
    };
  },
  beforeCreate() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    this.$http.get(`${this.$host}category`).then(response => {
      Indicator.close();
      // console.log(response);
      this.female = response.data.female;
      this.male = response.data.male;
    });
  }
};
</script>
<style scoped lang="scss">
ul,
li {
  list-style: none;
}
#rank {
  h2 {
    padding: 15px 0;
  }
  .item-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      overflow: hidden;
      text-align: center;
      margin-bottom: 5px;
      max-width: 100px;
      .title {
        font-size: 14px;
        font-weight: bold;
      }
      .bookCover {
        box-shadow: 0 0 10px #ccc;
        width: 100px;
        height: 130px;
      }
    }
  }
}
</style>
