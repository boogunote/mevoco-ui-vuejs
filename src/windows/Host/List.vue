<script>
import rpc from 'src/utils/rpc'
import MultiSelectList from 'src/windows/Base/MultiSelectList'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [MultiSelectList, WindowBase],
  created: function () {
  },
  methods: {
    queryList: async function () {
      let resp = await rpc.call('org.zstack.header.host.APIQueryHostMsg', {
        count: false,
        start: 0,
        limit: 1000,
        replyWithCount: true,
        conditions: []
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
        tableName: 'host',
        list: resp.inventories
      })
    }
  }
}
</script>