<template>
  <div style="height: 100%;">
    <div>VM Instance</div>
    <button @click="updatePage({ showDlgCreateVmInstance: true })">Create</button>
    <create-vm-instance-dlg v-if="pageData.showDlgCreateVmInstance" @close="updatePage({ showDlgCreateVmInstance: false })">
      <h3 slot="header">custom header</h3>
    </create-vm-instance-dlg>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uuid in pageData.uuidList">
          <td @click="updatePage({ currItemUuid: uuid })">{{ dbData.vm[uuid].name }}</td>
        </tr>
      </tbody>
    </table>
    <vm-instance-detail-side-page v-if="!!pageData.currItemUuid" :uuid="pageData.currItemUuid" @close="updatePage({ currItemUuid: '' })" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

import rpc from 'src/utils/rpc'
import CreateVmInstanceDlg from 'src/windows/CreateVmInstance'
Vue.component('create-vm-instance-dlg', CreateVmInstanceDlg)
import VmInstanceDetailSidePage from 'src/windows/VmInstanceDetailSidePage'
Vue.component('vm-instance-detail-side-page', VmInstanceDetailSidePage)

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
        'org.zstack.header.vm.APIQueryVmInstanceMsg': {
          count: false,
          start: 0,
          limit: 1000,
          replyWithCount: true,
          conditions: []
        }
      }, (resp) => {
        self.updatePage({ uuidList: resp.inventories.map((item) => item.uuid) })
        self.updateDbTable({
          tableName: 'vm',
          list: resp.inventories
        })
      })
    },
    updatePage: function (newState) {
      this._updatePage({ page: 'vm', newState })
    },
    ...mapActions([
      'updateDbTable'
    ]),
    ...mapActions({
      _updatePage: 'updatePage'
    })
  },
  computed: {
    pageData: function () {
      return this.$store.state.pages.vm
    },
    dbData: function () {
      return this.$store.state.db
    }
  }
}
</script>

<style scoped>
.sidepage {
    position: absolute;
    top: 60px;
    bottom: 0;
    right: 0;
    width: 50%;
    background-color: #fff;
    overflow: hidden;
    z-index: 10;
    padding-top: 150px;
    box-shadow: -5px 0 0 rgba(0,0,0,.07);
}
</style>
