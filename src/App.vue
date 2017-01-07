<template>
  <div id="app">
    <select v-model="Vue.config.lang">
      <option value="zh-CN">中文</option>
      <option value="en">English</option>
    </select>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      Vue: Vue
    }
  },
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
