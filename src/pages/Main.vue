<template>
  <div>
    <div class="nav">
      <ul>
        <router-link to="/main/vm" tag='li' active-class="active"><div class="item">VM</div></router-link>
        <router-link to="/main/host" tag='li' active-class="active"><div class="item">Host</div></router-link>
      </ul>
    </div>
    <div class="section">
      <div class="header">
        welcome
      </div>
      <router-view class="content"></router-view>
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
  padding-top: 60px
}

.header {
  position: absolute;
  top: 0;
  height: 60px;
}

.content {
  width: 100%;
  height: 100%;
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

.active .item {
  background-color: #262E3D;
  color: #fff;
  box-shadow: 4px 0 0 #15A4F4 inset;
}
</style>
