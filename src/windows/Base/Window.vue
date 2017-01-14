<script>
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'

export default {
  props: ['assigned-id'],
  created: function () {
    this.createWindow()
  },
  destroyed: function () {
    this.destroyWindow(this.windowId)
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
        className: this.className
      })
    },
    updateWindow: function (newState) {
      return this._updateWindow({ id: this.windowId, ...newState })
    },
    openDialog: function (className, param) {
      let windowId = `${className}-${genUniqueId()}`
      this._openDialog({
        id: windowId,
        parentWindowId: this.windowId,
        param
      })

      this._createWindow({
        id: windowId,
        className: className
      })


      return windowId
    },
    updateWindow: function (newState) {
      return this._updateWindow({ id: this.windowId, ...newState })
    },
    ...mapActions({
      _createWindow: 'createWindow',
      _updateWindow: 'updateWindow',
      _openDialog: 'openDialog',
      _updateDialog: 'updateDialog'
    }),
    ...mapActions([
      'destroyWindow',
      'closeDialog',
      'updateDbTable'
    ])
  },
  computed: {
    windowData: function () {
      // [NOTICE]'for "watch 'windowData.conditions'"'
      if (this.assignedId) this.windowId = this.assignedId
      return this.$store.state.windows[this.windowId]
    },
    dbData: function () {
      return this.$store.state.db
    }
  }
}
</script>