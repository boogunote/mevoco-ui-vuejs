<script>
import rpc from 'src/utils/rpc'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [WindowBase],
  created: function () {
    this.queryList()
  },
  methods: {
    queryList: async function () {
      let resp = await rpc.simpleCall('org.zstack.header.image.APIQueryImageMsg', {
        count: false,
        start: 0,
        limit: 1000,
        replyWithCount: true,
        conditions: []
      })
      this.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
      this.updateDbTable({
        tableName: 'image',
        list: resp.inventories
      })
    }
  }
}
</script>