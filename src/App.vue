<template>
  <div style="height: 100%; width: 100%">
    <router-view style="height: 100%; width: 100%"></router-view>
    <dialog-manager></dialog-manager>
  </div>
</template>

<script>
import Vue from 'vue'
import DialogManager from 'src/windows/Dialog/Manager'
Vue.component('dialog-manager', DialogManager)

export default {
  name: 'app'
}
</script>

<style>
</style>
