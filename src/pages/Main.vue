<template>
  <div>
    <div class="nav">
      <ul>
        <li><router-link to="/main/vm" :style="{color: $route.path != '/main/vm'? 'red':'yellow'}">VM</router-link></li>
        <li><router-link to="/main/host" :style="{color: $route.path != '/main/host'? 'red':'yellow'}">host</router-link></li>
      </ul>
    </div>
    <div class="section">
      <router-view class="full"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped>
.nav {
  width: 200px;
  height: 100%;
  float: left;
  background-color: #354052
}

.section {
  height: 100%;
  margin-left: 200px;
}
</style>
