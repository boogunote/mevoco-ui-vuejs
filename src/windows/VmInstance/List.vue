<script>
import Vue from 'vue'
import _ from 'lodash'
import rpc from 'src/utils/rpc'
import CreateVmInstanceDlg from 'src/windows/VmInstance/dialogs/CreateVmInstance'
Vue.component('create-vm-instance-dlg', CreateVmInstanceDlg)
import MultiSelectList from 'src/windows/Base/MultiSelectList'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [MultiSelectList, WindowBase],
  created: function () {
  },
  methods: {
    queryList: async function () {
      // const self = this
      let resp = await rpc.simpleCall('org.zstack.header.vm.APIQueryVmInstanceMsg', {
        count: false,
        start: 0,
        limit: 1000,
        replyWithCount: true,
        conditions: this.windowData.conditions
      })

      let uuidList = resp.inventories.map((item) => item.uuid)
      let table = {}
      uuidList.forEach((uuid) => {
        table[uuid] = {
          selected: false
        }
      })
      this.updateWindow({ uuidList, table })
      this.updateDbTable({
        tableName: 'vm',
        list: resp.inventories
      })
    },
    create: async function (param) {
      let resp = await rpc.simpleCall('org.zstack.header.vm.APICreateVmInstanceMsg', param)
      let uuidList = this.windowData.uuidList.slice()
      uuidList.unshift(resp.inventory.uuid)
      let row = {}
      row[resp.inventory.uuid] = {}
      row[resp.inventory.uuid].selected = false
      let table = Object.assign({}, { ...this.windowData.table }, row)
      this.updateWindow({ uuidList, table })
      this.updateDbTable({
        tableName: 'vm',
        list: [resp.inventory]
      })
    },
    delete: function (uuidList) {
      const self = this
      uuidList.forEach(function (uuid) {
        ((uuid) => {
          rpc.call({
            'org.zstack.header.vm.APIDestroyVmInstanceMsg': { uuid }
          }, (resp) => {
            let newUuidList = self.windowData.uuidList.filter((_uuid) => uuid !== _uuid)
            let newTable = _.cloneDeep(self.windowData.table)
            delete newTable[uuid]
            self.updateWindow({
              uuidList: newUuidList,
              table: newTable
            })
            // self.updateDbTable({
            //   tableName: 'vm',
            //   list: [resp.inventory]
            // })
          })
        })(uuid)
      })
    }
  }
}
</script>