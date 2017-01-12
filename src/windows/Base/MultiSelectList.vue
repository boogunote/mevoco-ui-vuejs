<script>
import WindowBase from 'src/windows/Base/Window'

export default {
  mixins: [WindowBase],
  created: function () {
    this.queryList()
  },
  methods: {
    clickCheckbox: function (uuid, $event) {
      let newState = {
        table: {
          ...this.windowData.table,
          [uuid]: {
            checked: !this.windowData.table[uuid].checked
          }
        }
      }
      this.updateWindow(newState)
    }
  }
}
</script>