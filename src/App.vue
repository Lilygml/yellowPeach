<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body{
  background-color: whitesmoke;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.weui-cells{
  background-color: #fff;
  padding: 10px;
  .weui-cell{
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: .2rem;
}
.weui-btn-area{
  padding: .5rem;
  text-align: center;
  .weui-btn{
    background: #ff9800;
    color: #fff;
    padding: .3rem 1.5rem;
    border-radius: .1rem;
    font-size: .32rem;
    font-weight: bold;
  }
}
</style>
