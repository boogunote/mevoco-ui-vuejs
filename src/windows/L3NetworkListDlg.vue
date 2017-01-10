<template>
  <dialog-template>
    <div slot="header">Network</div>
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uuid in windowData.uuidList" @click="updateWindow({ 'selectedItem': uuid })">
            <td>{{ dbData.l3network[uuid].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <button class="modal-default-button" @click="$emit('close', windowData.selectedItem)">
        OK
      </button>
    </div>
  </dialog-template>
</template>

<script>
import Vue from 'vue'
import DialogTemplate from 'src/windows/DialogTemplate'
Vue.component('dialog-template', DialogTemplate)
import L3NetworkList from 'src/windows/L3NetworkList'

export default {
  mixins: [L3NetworkList],
  data () {
    return {
      className: 'L3NetworkListDlg'
    }
  }
}
</script>

<style scoped>
</style>
