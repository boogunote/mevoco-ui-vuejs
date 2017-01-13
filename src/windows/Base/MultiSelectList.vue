<script>
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
    }
  },
  computed: {
    isAllSelected: function () {
      if (!this.windowData.uuidList || this.windowData.uuidList.length === 0) return false
      for (let i in this.windowData.uuidList) {
        if (!this.windowData.table[this.windowData.uuidList[i]].selected) {
          console.log(!this.windowData.table[this.windowData.uuidList[i]].selected)
          return false
        }
      }
      return true
    }
  }
}
</script>