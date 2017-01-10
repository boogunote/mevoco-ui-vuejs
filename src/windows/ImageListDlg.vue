<template>
  <dialog-template>
    <div slot="header">Image</div>
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uuid in windowData.uuidList" @click="updateWindow({ 'selectedItem': uuid })">
            <td>{{ dbData.image[uuid].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="$emit('close', windowData.selectedItem)">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)
import ImageList from 'src/windows/ImageList'

export default {
  mixins: [ImageList],
  data () {
    return {
      className: 'ImageListDlg'
    }
  }
}
</script>

<style scoped>
</style>
