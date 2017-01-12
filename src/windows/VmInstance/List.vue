<script>
import Vue from 'vue'

import rpc from 'src/utils/rpc'
import CreateVmInstanceDlg from 'src/windows/VmInstance/dialogs/CreateVmInstance'
Vue.component('create-vm-instance-dlg', CreateVmInstanceDlg)
import VmInstanceDetailSidePage from 'src/windows/VmInstance/DetailSidePage'
Vue.component('vm-instance-detail-side-page', VmInstanceDetailSidePage)
import MultiSelectList from 'src/windows/Base/MultiSelectList'

export default {
  mixins: [MultiSelectList],
  created: function () {
    this.queryList()
  },
  methods: {
    queryList: function () {
      const self = this
      rpc.call({
        'org.zstack.header.vm.APIQueryVmInstanceMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        let uuidList = resp.inventories.map((item) => item.uuid)
        let table = {}
        uuidList.forEach((uuid) => {
          table[uuid] = {
            checked: false
          }
        })
        self.updateWindow({ uuidList, table })
        self.updateDbTable({
          tableName: 'vm',
          list: resp.inventories
        })
      })
    },
    create: function (param) {
      const self = this
      rpc.call({
        'org.zstack.header.vm.APICreateVmInstanceMsg': param
      }, (resp) => {
        let uuidList = this.windowData.uuidList.slice()
        uuidList.unshift(resp.inventory.uuid)
        let row = {}
        row[resp.inventory.uuid] = {}
        row[resp.inventory.uuid].checked = false
        let table = Object.assign({}, { ...this.windowData.table }, row)
        self.updateWindow({ uuidList, table })
        self.updateDbTable({
          tableName: 'vm',
          list: [resp.inventory]
        })
      })
    }
  }
}
</script>