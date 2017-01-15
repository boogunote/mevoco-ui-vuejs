<script>
export default {
  methods: {
    cancel: function () {
      this.closeDialog(this.windowId)
    }
  },
  computed: {
    dialogData: function () {
      return this.$store.state.dialogs.windows[this.windowId]
    }
  }
}
</script>