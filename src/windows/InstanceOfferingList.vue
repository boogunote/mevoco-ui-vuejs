<template>
  <dialog-template>
    <div slot="header">Instance Offering</div>
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uuid in windowData.uuidList">
            <td>{{ instanceOffering[uuid].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="$emit('close')">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { genUniqueId } from 'src/utils/utils'
import rpc from 'src/utils/rpc'
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)

export default {
  data () {
    return {
      windowId: ''
    }
  },
  created: function () {
    this.windowId = `InstanceOffering-${genUniqueId()}`
    this.createWindow(this.windowId)

    this.queryList()
  },
  methods: {
    queryList: function () {
      const self = this
      rpc.call({
        'org.zstack.header.configuration.APIQueryInstanceOfferingMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        let uuidList = []
        resp.inventories.forEach((item) => {
          uuidList.push(item.uuid)
        })
        self.updateInstanceOffering(resp.inventories)
        self.updateWindow({
          id: this.windowId,
          uuidList
        }, 'aaaa')
      })
    },
    ...mapActions([
      'createWindow',
      'updateInstanceOffering',
      'updateWindow'
    ])
  },
  computed: {
    windowData: function () {
      return this.$store.state.windows[this.windowId]
    },
    instanceOffering: function () {
      return this.$store.state.db.instanceOffering
    }
  }
}
</script>

<style scoped>
</style>
