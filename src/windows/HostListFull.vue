<template>
  <div style="height: 100%;">
    <div>Host</div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uuid in windowData.uuidList">
          <td @click="updateWindow({ currItemUuid: uuid })">{{ dbData.host[uuid].name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HostList from 'src/windows/HostList'

export default {
  mixins: [HostList],
  data () {
    return {
      className: 'HostListFull'
    }
  }
}
</script>

<style scoped>
</style>
