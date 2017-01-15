<template>
  <dialog-template>
    <div slot="header">Create Instance</div>
    <div slot="body">
      <input :value="windowData.name" @input="(e) => { updateWindow({ 'name': e.target.value }) }">
      <br />
      <span>
        {{ dbData.instanceOffering[windowData.instanceOfferingUuid] && dbData.instanceOffering[windowData.instanceOfferingUuid].name }}
      </span>
      <button @click="openDialog('InstanceOfferingListDlg', { conditions: instanceOfferingConditions, ok: selectInstanceOffering })">Instance Offering</button>
      <!-- <instance-offering-list-dlg
        v-if="windowData.showInstanceOfferingDlg"
        @close="(uuid) => updateWindow({ 'showInstanceOfferingDlg': false, 'instanceOfferingUuid': uuid })"
        :assigned-id="windowData.instanceOfferingWindowId"
        :conditions="instanceOfferingConditions" 
      /> -->
      <br />
      <span>
        {{ dbData.image[windowData.imageUuid] && dbData.image[windowData.imageUuid].name }}
      </span>
      <button @click="openDialog('ImageListDlg', { conditions: [], ok: selectImage })">Image</button>
      <!-- <button @click="updateWindow({ 'showImageDlg': true })">Image</button> -->
      <!-- <image-list-dlg
        v-if="windowData.showImageDlg"
        @close="(uuid) => updateWindow({ 'showImageDlg': false, 'imageUuid': uuid })"
      /> -->
      <br />
      <span>
        {{ dbData.l3network[windowData.networkUuid] && dbData.l3network[windowData.networkUuid].name }}
      </span>
      <button @click="openDialog('L3NetworkListDlg', { conditions: [], ok: selectNetwork })">Network</button>
<!--       <button @click="updateWindow({ 'showNetowrkDlg': true })">Network</button>
      <l3network-list-dlg
        v-if="windowData.showNetowrkDlg"
        @close="(uuid) => updateWindow({ 'showNetowrkDlg': false, 'networkUuid': uuid })"
      /> -->
      <br />
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="ok">OK</button>
      <button class="modal-default-button" @click="cancel">Cancel</button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import { genUniqueId } from 'src/utils/utils'
import InstanceOfferingListDlg from 'src/windows/VmInstance/dialogs/InstanceOfferingList'
Vue.component('instance-offering-list-dlg', InstanceOfferingListDlg)
import ImageListDlg from 'src/windows/VmInstance/dialogs/ImageList'
Vue.component('image-list-dlg', ImageListDlg)
import L3NetworkListDlg from 'src/windows/VmInstance/dialogs/L3NetworkList'
Vue.component('l3network-list-dlg', L3NetworkListDlg)
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)
import WindowBase from 'src/windows/Base/Window'
import DialogBase from 'src/windows/Base/Dialog'

export default {
  mixins: [WindowBase, DialogBase],
  data () {
    return {
      className: 'CreateVmInstanceDlg',
      instanceOfferingConditions: []
      // [DON'T REMOVE] Example of passing object to child component
      // instanceOfferingConditions: [{
      //   name: 'name',
      //   op: '=',
      //   value: 'test'
      // }]
    }
  },
  created () {
    this.updateWindow({
      name: '',
      instanceOfferingUuid: '',
      imageUuid: '',
      networkUuid: '',
      instanceOfferingWindowId: `InstanceOfferingDlg-${genUniqueId()}`,
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
      // const self = this
      this.updateWindow({ 'showInstanceOfferingDlg': true })
      .then(function () {
        // [DON'T REMOVE]Example for outer change.
        // self._updateWindow({
        //   id: self.windowData.instanceOfferingWindowId,
        //   conditions: [{
        //     name: 'name',
        //     op: '=',
        //     value: 'test'
        //   }]
        // })
      })
    },
    selectInstanceOffering: function (uuid) {
      this.updateWindow({ instanceOfferingUuid: uuid })
    },
    selectImage: function (uuid) {
      this.updateWindow({ imageUuid: uuid })
    },
    selectNetwork: function (uuid) {
      this.updateWindow({ networkUuid: uuid })
    },
    ok: function () {
      this.dialogData.param.ok(this.createParam())
      this.closeDialog(this.windowId)
    }
  }
}
</script>

<style scoped>
</style>