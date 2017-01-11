<template>
  <dialog-template>
    <div slot="header">Create Instance</div>
    <div slot="body">
      <input :value="windowData.name" @input="(e) => { updateWindow({ 'name': e.target.value }) }">
      <br />
      <span>
        {{ dbData.instanceOffering[windowData.instanceOfferingUuid] && dbData.instanceOffering[windowData.instanceOfferingUuid].name }}
      </span>
      <button @click="openInstanceOfferingDlg">Instance Offering</button>
      <instance-offering-list-dlg
        v-if="windowData.showInstanceOfferingDlg"
        @close="(uuid) => updateWindow({ 'showInstanceOfferingDlg': false, 'instanceOfferingUuid': uuid })"
        :assigned-id="windowData.instanceOfferingWindowId"
      />
      <br />
      <span>
        {{ dbData.image[windowData.imageUuid] && dbData.image[windowData.imageUuid].name }}
      </span>
      <button @click="updateWindow({ 'showImageDlg': true })">Image</button>
      <image-list-dlg
        v-if="windowData.showImageDlg"
        @close="(uuid) => updateWindow({ 'showImageDlg': false, 'imageUuid': uuid })"
      />
      <br />
      <span>
        {{ dbData.l3network[windowData.networkUuid] && dbData.l3network[windowData.networkUuid].name }}
      </span>
      <button @click="updateWindow({ 'showNetowrkDlg': true })">Network</button>
      <l3network-list-dlg
        v-if="windowData.showNetowrkDlg"
        @close="(uuid) => updateWindow({ 'showNetowrkDlg': false, 'networkUuid': uuid })"
      />
      <br />
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="$emit('close', createParam())">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import InstanceOfferingListDlg from 'src/windows/InstanceOfferingListDlg'
Vue.component('instance-offering-list-dlg', InstanceOfferingListDlg)
import ImageListDlg from 'src/windows/ImageListDlg'
Vue.component('image-list-dlg', ImageListDlg)
import L3NetworkListDlg from 'src/windows/L3NetworkListDlg'
Vue.component('l3network-list-dlg', L3NetworkListDlg)
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)
import WindowBase from 'src/windows/WindowBase'

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
      instanceOfferingWindowId: 'kashfashflashfklshfsdklfhskfhdsf',
      showInstanceOfferingDlg: false,
      showImageDlg: false,
      showNetworkDlg: false
    })
  },
  methods: {
    createParam: function () {
      return {
        name: this.windowData.name,
        instanceOfferingUuid: this.windowData.instanceOfferingUuid,
        imageUuid: this.windowData.imageUuid,
        l3NetworkUuids: [this.windowData.networkUuid],
        defaultL3NetworkUuid: this.windowData.networkUuid
      }
    },
    openInstanceOfferingDlg: function () {
      const self = this
      this.updateWindow({ 'showInstanceOfferingDlg': true })
      .then(function () {
        self._updateWindow({
          id: self.windowData.instanceOfferingWindowId,
          conditions: [{
            name: 'name',
            op: '=',
            value: 'test'
          }]
        })
      })
    }
  }
}
</script>

<style scoped>
</style>