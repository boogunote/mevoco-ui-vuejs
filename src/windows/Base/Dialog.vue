<script>
export default {
  computed: {
    dialogData: function () {
      return this.$store.state.dialogs.windows[this.windowId]
    }
  }
}
</script>