<script>
export default {
  props: [ 'param' ],
  methods: {
    cancel: function () {
      this.closeDialog(this.windowId)
    }
  },
  computed: {
    dialogData: function () {
      return this.$store.state.dialogManager.windows[this.windowId]
    }
  }
}
</script>