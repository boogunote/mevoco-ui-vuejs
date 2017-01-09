<template>
  <dialog-template>
    <div slot="header">Create Instance</div>
    <div slot="body">
      <!-- <input v-model="name" /> -->
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
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'
import InstanceOfferingListDlg from 'src/windows/InstanceOfferingList'
import DialogTemplate from 'src/windows/DialogTemplate'

Vue.component('dialog-template', DialogTemplate)
Vue.component('instance-offering-list-dlg', InstanceOfferingListDlg)

export default {
  data () {
    return {
      windowId: ''
    }
  },
  created: function () {
    this.createWindow()
  },
  destroyed: function () {
    this.destroyWindow(this.windowId)
  },
  methods: {
    createWindow: function () {
      this.windowId = `CreateVmInstance-${genUniqueId()}`
      this._createWindow(this.windowId)
      this.updateWindow({
        name: '',
        instanceOfferingUuid: '',
        imageUuid: '',
        networkUuid: '',
        showInstanceOfferingDlg: false,
        showImageDlg: false,
        showNetworkDlg: false
      })
    },
    updateWindow: function (newState) {
      this._updateWindow({ id: this.windowId, ...newState })
    },
    ...mapActions({
      _createWindow: 'createWindow',
      _updateWindow: 'updateWindow'
    }),
    ...mapActions([
      'destroyWindow'
    ])
  },
  computed: {
    windowData: function () {
      return this.$store.state.windows[this.windowId]
    }
  }
}
</script>

<style scoped>
</style>