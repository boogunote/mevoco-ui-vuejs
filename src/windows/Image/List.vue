<script>
import rpc from 'src/utils/rpc'
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
        'org.zstack.header.image.APIQueryImageMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        self.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
        self.updateDbTable({
          tableName: 'image',
          list: resp.inventories
        })
      })
    }
  }
}
</script>