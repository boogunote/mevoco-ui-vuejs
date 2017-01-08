<template>
  <div>
    <input type="text" v-model="accountName" />
    <input type="password" v-model="password" />
    <button id="login" @click="login()">{{ $t("common.login") }}</button>
  </div>
</template>

<script>
import 'whatwg-fetch'
import sha512 from 'crypto-js/sha512'
// import VueRouter from 'vue-router'
// const router = new VueRouter()

/* global fetch:false */
/* global TextDecoder:false */
/* global localStorage:false */

import * as rpc from 'src/utils/rpc'

export default {
  name: 'login',
  data () {
    return {
      accountName: 'admin',
      password: 'password'
    }
  },
  methods: {
    login: function () {
      // const self = this;
      fetch(`http://localhost:8080/apiCall/login?accountName=${this.accountName}&password=${sha512(this.password).toString()}`)
      .then(function (response) {
        const reader = response.body.getReader()
        reader.read().then(({value, done}) => {
          const output = new TextDecoder('utf-8').decode(value)
          const reply = JSON.parse(output)
          if (reply) {
            localStorage.setItem('sessionUuid', reply.inventory.uuid)
            debugger
            rpc.connect(() => {
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
              })
            })
            // router.push('main')
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
