<template>
  <div>
    <div class="nav">
      <ul>
        <router-link to="/main/vm" tag='li'><div class="item">VM</div></router-link>
        <router-link to="/main/host" tag='li'><div class="item">Host</div></router-link>
      </ul>
    </div>
    <div class="section">
      <div class="header">
      </div>
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

.header {
  height: 60px;
}

.item {
  display: block;
  padding: 10px 10px 10px 25px;
  color: #A0ABBF;
  cursor: pointer;
}

.item:hover {
  background-color: #262E3D;
  color: #fff;
}

.router-link-active .item {
  background-color: #262E3D;
  color: #fff;
  box-shadow: 4px 0 0 #15A4F4 inset;
}
</style>
