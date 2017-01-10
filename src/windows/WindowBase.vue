<script>
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'

export default {
  created: function () {
    this.createWindow()
  },
  destroyed: function () {
    this.destroyWindow(this.windowId)
  },
  methods: {
    createWindow: function () {
      this.windowId = `${this.className}-${genUniqueId()}`
      this._createWindow(this.windowId)
    },
    updateWindow: function (newState) {
      this._updateWindow({ id: this.windowId, ...newState })
    },
    ...mapActions({
      _createWindow: 'createWindow',
      _updateWindow: 'updateWindow'
    }),
    ...mapActions([
      'destroyWindow',
      'updateDbTable'
    ])
  },
  computed: {
    windowData: function () {
      return this.$store.state.windows[this.windowId]
    },
    dbData: function () {
      return this.$store.state.db
    }
  }
}
</script>