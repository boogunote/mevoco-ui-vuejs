<script>
import rpc from 'src/utils/rpc'
import { isConditionsEqual, genUniqueId } from 'src/utils/utils'
import WindowBase from 'src/windows/WindowBase'

export default {
  mixins: [WindowBase],
  props: {
    'assigned-id': String,
    conditions: Array
  },
  created: function () {
    this.queryList()
  },
  methods: {
    createWindow: function () {
      if (this.assignedId) {
        this.windowId = this.assignedId
      } else {
        this.windowId = `${this.className}-${genUniqueId()}`
      }
      return this._createWindow({
        id: this.windowId,
        className: this.className,
        conditions: this.conditions
      })
    },
    queryList: function () {
      const self = this
      rpc.call({
        'org.zstack.header.configuration.APIQueryInstanceOfferingMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: this.windowData.conditions ? this.windowData.conditions : []
        }
      }, (resp) => {
        self.updateWindow({ uuidList: resp.inventories.map((item) => item.uuid) })
        self.updateDbTable({
          tableName: 'instanceOffering',
          list: resp.inventories
        })
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