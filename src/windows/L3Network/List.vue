<script>
import rpc from 'src/utils/rpc'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [WindowBase],
  created: function () {
    this.queryList()
  },
  methods: {
    queryList: function () {
      const self = this
      rpc.call({
        'org.zstack.header.network.l3.APIQueryL3NetworkMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        self.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
        self.updateDbTable({
          tableName: 'l3network',
          list: resp.inventories
        })
      })
    }
  }
}
</script>