<template>
  <div style="height: 100%;">
    <div>VM Instance</div>
    <!-- <button @click="updateWindow({ showDlgCreateVmInstance: true })">Create</button> -->
    <button @click="openDialog('CreateVmInstanceDlg', { ok: create })">Create</button>
    <button @click="pageDelete">Delete</button>
<!--     <create-vm-instance-dlg
      v-if="windowData.showDlgCreateVmInstance"
      @close="(param) => { create(param); updateWindow({ showDlgCreateVmInstance: false }) }" /> -->
    <table class="page-table">
      <thead>
        <tr>
          <th><input type="checkbox" :checked="isAllSelected" @change="clickSelectAll()"></input></th>
          <th>Name</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Create Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uuid in windowData.uuidList" :class="{ 'table-highlight': windowData.table[uuid].selected }" @click="updateWindow({ currItemUuid: uuid })">
          <td><input type="checkbox" :checked="windowData.table[uuid].selected" @change="clickCheckbox(uuid, $event)" @click.stop></td>
          <td>{{ dbData.vm[uuid].name }}</td>
          <td>{{ dbData.vm[uuid].cpuNum }}</td>
          <td>{{ dbData.vm[uuid].memorySize }}</td>
          <td>{{ dbData.vm[uuid].createDate }}</td>
        </tr>
      </tbody>
    </table>
    <vm-instance-detail-side-page v-if="!!windowData.currItemUuid" :uuid="windowData.currItemUuid" @close="updateWindow({ currItemUuid: '' })" />
  </div>
</template>

<script>
import Vue from 'vue'
import VmInstanceList from 'src/windows/VmInstance/List'
import VmInstanceDetailSidePage from 'src/windows/VmInstance/DetailSidePage'
Vue.component('vm-instance-detail-side-page', VmInstanceDetailSidePage)
import DialogManager from 'src/windows/Dialog/Manager'

export default {
  name: 'VmInstancePage',
  mixins: [VmInstanceList, DialogManager],
  created: function () {
    this.updateWindow({ conditions: [{
      name: 'state',
      op: '!=',
      value: 'Destroyed'
    }] })
    this.queryList()
  },
  data () {
    return {
      className: 'VmInstanceListPage'
    }
  },
  methods: {
    pageDelete: function () {
      let uuidList = []
      this.windowData.uuidList.forEach((uuid) => {
        if (this.windowData.table[uuid].selected) uuidList.push(uuid)
      })
      if (uuidList.length > 0) this.delete(uuidList)
    }
  }
}
</script>