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
      <button class="modal-default-button" @click="ok">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)
import ImageList from 'src/windows/Image/List'
import DialogBase from 'src/windows/Base/Dialog'

export default {
  mixins: [ImageList, DialogBase],
  data () {
    return {
      className: 'ImageListDlg'
    }
  },
  methods: {
    ok: function () {
      this.dialogData.param.cb(this.windowData.selectedItem)
      this.closeDialog(this.windowId)
    }
  }
}
</script>

<style scoped>
</style>
