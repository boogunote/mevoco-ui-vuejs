<template>
  <div>
    <component v-for="dlg in dialogList" :is="dlg.class" :assigned-id="dlg.windowId">
    </component>
  </div>
</template>

<script>
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": ".*" }] */
// import Vue from 'vue'
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'
let dialogClass = {}
import CreateVmInstanceDlg from 'src/windows/VmInstance/dialogs/CreateVmInstance'
dialogClass.CreateVmInstanceDlg = CreateVmInstanceDlg
import InstanceOfferingListDlg from 'src/windows/VmInstance/dialogs/InstanceOfferingList'
dialogClass.InstanceOfferingListDlg = InstanceOfferingListDlg
import ImageListDlg from 'src/windows/VmInstance/dialogs/ImageList'
dialogClass.ImageListDlg = ImageListDlg
import L3NetworkListDlg from 'src/windows/VmInstance/dialogs/L3NetworkList'
dialogClass.L3NetworkListDlg = L3NetworkListDlg

export default {
  name: 'DialogManager',
  created: function () {
  },
  data: function () {
    return {
      console: console
    }
  },
  computed: {
    dialogList: function () {
      const self = this
      let list = []
      this.$store.state.dialogManager.windowIdList.forEach((windowId) => {
        list.push({
          windowId,
          class: dialogClass[self.$store.state.windowManager.windows[windowId].className]
        })
      })
      return list
    }
  }
}
</script>

<style scoped>
</style>