<script>
import rpc from 'src/utils/rpc'
import { isConditionsEqual } from 'src/utils/utils'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [WindowBase],
  props: {
    conditions: Array
  },
  created: function () {
  },
  methods: {
    queryList: async function () {
      let resp = await rpc.call('org.zstack.header.configuration.APIQueryInstanceOfferingMsg', {
        count: false,
        start: 0,
        limit: 1000,
        replyWithCount: true,
        conditions: this.windowData.conditions ? this.windowData.conditions : []
      })
      this.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
      this.updateDbTable({
        tableName: 'instanceOffering',
        list: resp.inventories
      })
    }
  },
  watch: {
    'windowData.conditions': function (conditions, oldConditions) {
      if (!isConditionsEqual(conditions, oldConditions)) this.queryList()
    }
  }
}
</script>