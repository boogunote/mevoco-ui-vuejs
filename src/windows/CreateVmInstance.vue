<template>
  <dialog-template>
    <div slot="header">Create Instance</div>
    <div slot="body">
      <input v-model="name" />
      <br />
      <span>{{ instanceOfferingUuid }}</span><button @click="showModal = true">Instance Offering</button>
      <instance-offering-list-dlg v-if="showModal" @close="showModal = false" />
      <br />
      <span>{{ imageUuid }}</span><button @click="showModal = true">Image</button>
      <br />
      <span>{{ networkUuid }}</span><button @click="showModal = true">Network</button>
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
import InstanceOfferingListDlg from 'src/windows/InstanceOfferingList'
import DialogTemplate from 'src/windows/DialogTemplate'

Vue.component('dialog-template', DialogTemplate)
Vue.component('instance-offering-list-dlg', InstanceOfferingListDlg)

export default {
  data () {
    return {
      showModal: false,
      name: '',
      instanceOfferingUuid: '',
      imageUuid: '',
      networkUuid: ''
    }
  },
  created: function () {
    this.queryList()
  },
  methods: {
    queryList: function () {
    }
  }
}
</script>

<style scoped>
</style>