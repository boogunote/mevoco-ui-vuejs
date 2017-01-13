<script>
import _ from 'lodash'
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [WindowBase],
  created: function () {
  },
  methods: {
    clickCheckbox: function (uuid, $event) {
      let newState = {
        table: {
          ...this.windowData.table,
          [uuid]: {
            selected: !this.windowData.table[uuid].selected
          }
        }
      }
      this.updateWindow(newState)
    },
    clickSelectAll: function () {
      let newState = !this.isAllSelected
      let table = _.cloneDeep(this.windowData.table)
      this.windowData.uuidList.forEach((uuid) => {
        table[uuid].selected = newState
      })
      this.updateWindow({ table })
    }
  },
  computed: {
    isAllSelected: function () {
      if (!this.windowData.uuidList || this.windowData.uuidList.length === 0) return false
      for (let i in this.windowData.uuidList) {
        if (!this.windowData.table[this.windowData.uuidList[i]].selected) {
          return false
        }
      }
      return true
    }
  }
}
</script>