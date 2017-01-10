<script>
import Vue from 'vue'

import rpc from 'src/utils/rpc'
import CreateVmInstanceDlg from 'src/windows/CreateVmInstance'
Vue.component('create-vm-instance-dlg', CreateVmInstanceDlg)
import VmInstanceDetailSidePage from 'src/windows/VmInstanceDetailSidePage'
Vue.component('vm-instance-detail-side-page', VmInstanceDetailSidePage)
import WindowBase from 'src/windows/WindowBase'

export default {
  mixins: [WindowBase],
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
        self.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
        self.updateDbTable({
          tableName: 'vm',
          list: resp.inventories
        })
      })
    }
  }
}
</script>