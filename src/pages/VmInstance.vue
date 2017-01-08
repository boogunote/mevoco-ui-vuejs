<template>
  <div>
    <div>VM Instance</div>
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
import * as rpc from 'src/utils/rpc'

export default {
  name: 'vmInstance',
  data () {
    return {
      itemList: []
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
        console.log(resp)
        self.itemList = resp.inventories
      })
    }
  }
}
</script>

<style scoped>
</style>
