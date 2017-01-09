<template>
  <div>
    <div>Host</div>
    <button @click="showModal = true">Create</button>
    <create-vm-instance-dlg v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </create-vm-instance-dlg>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemList">
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import * as rpc from 'src/utils/rpc'
import CreateVmInstanceDlg from 'src/modals/CreateVmInstance'

Vue.component('create-vm-instance-dlg', CreateVmInstanceDlg)

export default {
  name: 'vmInstance',
  data () {
    return {
      itemList: [],
      showModal: false
    }
  },
  created: function () {
    this.queryList()
  },
  methods: {
    queryList: function () {
      const self = this
      rpc.call({
        'org.zstack.header.host.APIQueryHostMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        console.log(resp)
        self.itemList = resp.inventories
      })
    }
  }
}
</script>

<style scoped>
</style>
