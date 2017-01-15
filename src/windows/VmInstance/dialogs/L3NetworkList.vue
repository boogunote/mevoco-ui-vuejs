<template>
  <dialog-template>
    <div slot="header">Network</div>
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uuid in windowData.uuidList" @click="updateWindow({ 'selectedItem': uuid })">
            <td>{{ dbData.l3network[uuid].name }}</td>
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
import L3NetworkList from 'src/windows/L3Network/List'
import DialogBase from 'src/windows/Base/Dialog'

export default {
  mixins: [L3NetworkList, DialogBase],
  data () {
    return {
      className: 'L3NetworkListDlg'
    }
  },
  methods: {
    ok: function () {
      this.dialogData.param.ok(this.windowData.selectedItem)
      this.closeDialog(this.windowId)
    }
  }
}
</script>

<style scoped>
</style>
