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
      if (!this.windowData.uuidList) {
        console.log('this.windowData.uuidList is null')
      } else {
        console.log('this.windowData.uuidList.length=' + this.windowData.uuidList.length)
      }
      if (!this.windowData.uuidList || this.windowData.uuidList.length === 0) return false
      for (let i in this.windowData.uuidList) {
        console.log('this.windowData.table[this.windowData.uuidList[i]].selected=' + this.windowData.table[this.windowData.uuidList[i]].selected)
        if (!this.windowData.table[this.windowData.uuidList[i]].selected) {
          console.log('return false')
          return false
        }
      }
      console.log('return true')
      return true
    }
  }
}
</script>