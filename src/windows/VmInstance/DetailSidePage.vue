<template>
  <div class="sidepage">
    <div class="header">
      {{dbData.vm[uuid].name}}
      <button @click="$emit('close')">x</button>
    </div>
    <div class="body">
    </div>
  </div>
</template>

<script>
import VmInstanceDetail from './Detail'

export default {
  mixins: [VmInstanceDetail],
  data () {
    return {
      className: 'VmInstanceDetailSidePage'
    }
  }
}
</script>

<style scoped>
.sidepage {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 50%;
  background-color: #fff;
  overflow: hidden;
  z-index: 10;
  padding-top: 150px;
  box-shadow: -5px 0 0 rgba(0,0,0,.07);
}
.header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 150px;
  color: #fff;
  background-color: #354052
}
</style>