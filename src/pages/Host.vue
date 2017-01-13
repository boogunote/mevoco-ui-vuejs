<template>
  <div style="height: 100%;">
    <div>Host</div>
    <table class="page-table">
      <thead>
        <tr>
          <th><input type="checkbox" :checked="isAllSelected" @change="clickSelectAll()"></input></th>
          <th>Name</th>
          <th>Management IP</th>
          <th>Status</th>
          <th>Create Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uuid in windowData.uuidList" :class="{ 'table-highlight': windowData.table[uuid].selected }" @click="updateWindow({ currItemUuid: uuid })">
          <td><input type="checkbox" :checked="windowData.table[uuid].selected" @change="clickCheckbox(uuid, $event)" @click.stop></td>
          <td>{{ dbData.host[uuid].name }}</td>
          <td>{{ dbData.host[uuid].managementIp }}</td>
          <td>{{ dbData.host[uuid].status }}</td>
          <td>{{ dbData.host[uuid].createDate }}</td>
        </tr>
      </tbody>
    </table>
    <host-detail-side-page v-if="!!windowData.currItemUuid" :uuid="windowData.currItemUuid" @close="updateWindow({ currItemUuid: '' })" />
  </div>
</template>

<script>
import Vue from 'vue'
import HostList from 'src/windows/Host/List'
import HostDetailSidePage from 'src/windows/Host/DetailSidePage'
Vue.component('host-detail-side-page', HostDetailSidePage)

export default {
  name: 'HostListPage',
  mixins: [HostList],
  created: function () {
    this.queryList()
  },
  data () {
    return {
      className: 'HostListPage'
    }
  }
}
</script>

<style scoped>
</style>
