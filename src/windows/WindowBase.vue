<script>
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'

export default {
  created: function () {
    console.log('create base')
    this.test()
    this.createWindow()
  },
  destroyed: function () {
    console.log('destroyed base')
    this.destroyWindow(this.windowId)
  },
  methods: {
    createWindow: function () {
      this.windowId = `${this.className}-${genUniqueId()}`
      this._createWindow(this.windowId)
    },
    test: function () {
      console.log('test base')
    },
    updateWindow: function (newState) {
      this._updateWindow({ id: this.windowId, ...newState })
    },
    ...mapActions({
      _createWindow: 'createWindow',
      _updateWindow: 'updateWindow'
    }),
    ...mapActions([
      'destroyWindow'
    ])
  },
  computed: {
    windowData: function () {
      return this.$store.state.windows[this.windowId]
    }
  }
}
</script>