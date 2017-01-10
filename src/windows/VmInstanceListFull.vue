<template>
  <div style="height: 100%;">
    <div>VM Instance</div>
    <button @click="updateWindow({ showDlgCreateVmInstance: true })">Create</button>
    <create-vm-instance-dlg
      v-if="windowData.showDlgCreateVmInstance"
      @close="(param) => { create(param); updateWindow({ showDlgCreateVmInstance: false }) }" />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Create Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uuid in windowData.uuidList" :class="{ 'table-highlight': uuid == windowData.currItemUuid }" @click="updateWindow({ currItemUuid: uuid })">
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
import VmInstanceList from 'src/windows/VmInstanceList'

export default {
  mixins: [VmInstanceList],
  data () {
    return {
      className: 'VmInstanceListFull'
    }
  }
}
</script>