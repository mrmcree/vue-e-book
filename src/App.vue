<template>
  <div id="app">
    <router-view class="child-view" />

    <!-- <input @change="changeSkin" v-model="skin" type='color'/> -->
  </div>
</template>
<script>
export default {
  // beforeRouteUpdate(to, from, next) {
  //   const toDepth = to.path.split("/").length;
  //   const fromDepth = from.path.split("/").length;
  //   this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  //   next();
  // },
  name: "app",
  data() {
    return {
      skin: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
ul,li{
  list-style: none;
}
.container {
  padding: 0 15px;
}
:root {
  --theme-font-color: #000;
  --theme-background-color: #fff;
  --theme-color: green;
}
</style>
