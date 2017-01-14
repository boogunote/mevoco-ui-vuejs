<template>
  <dialog-template>
    <div slot="header">Instance Offering</div>
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uuid in windowData.uuidList" @click="updateWindow({ 'selectedItem': uuid })">
            <td>{{ dbData.instanceOffering[uuid].name }}</td>
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
import InstanceOfferingList from 'src/windows/InstanceOffering/List'
import DialogBase from 'src/windows/Base/Dialog'

export default {
  mixins: [InstanceOfferingList, DialogBase],
  data () {
    return {
      className: 'InstanceOfferingListDlg'
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
