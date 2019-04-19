<template>
  <div class="home"> 
      <router-link to="/rank" class="link">分类</router-link>|
      <router-link to="/about" class="link">书架</router-link>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: "home",
  
  components: {
   
  },
  computed:{
  }
};
</script>
<style scoped lang='scss'>
.home{
  display: flex;
  flex-wrap: wrap;

  .link{
    flex-basis: 100%;
    height: 50vh;
    line-height: 50vh;
    font-size:50px;
    text-decoration: none;
    color:#000;
    text-align: center;
    &:first-child{
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
