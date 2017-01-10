<template>
  <dialog-template>
    <div slot="header">Create Instance</div>
    <div slot="body">
      <input :value="windowData.name" @input="(e) => { updateWindow({ 'name': e.target.value }) }">
      <br />
      <span>{{ windowData.instanceOfferingUuid }}</span><button @click="updateWindow({ 'showInstanceOfferingDlg': true })">Instance Offering</button>
      <instance-offering-list-dlg v-if="windowData.showInstanceOfferingDlg" @close="updateWindow({ 'showInstanceOfferingDlg': false })" />
      <br />
      <span>{{ windowData.imageUuid }}</span><button @click="updateWindow({ 'showImageDlg': true })">Image</button>
      <br />
      <span>{{ windowData.networkOfferingUuid }}</span><button @click="updateWindow({ 'showNetowrkDlg': true })">Network</button>
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="$emit('close')">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import InstanceOfferingListDlg from 'src/windows/InstanceOfferingList'
import DialogTemplate from 'src/windows/DialogTemplate'
import WindowBase from 'src/windows/WindowBase'

Vue.component('dialog-template', DialogTemplate)
Vue.component('instance-offering-list-dlg', InstanceOfferingListDlg)

export default {
  mixins: [WindowBase],
  data () {
    return {
      className: 'CreateInstance'
    }
  },
  created () {
    this.updateWindow({
      name: '',
      instanceOfferingUuid: '',
      imageUuid: '',
      networkUuid: '',
      showInstanceOfferingDlg: false,
      showImageDlg: false,
      showNetworkDlg: false
    })
  }
}
</script>

<style scoped>
</style>