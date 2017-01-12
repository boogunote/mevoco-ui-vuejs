import SockJS from 'sockjs-client'
import 'stompjs/lib/stomp.js'
import { genUniqueId } from './utils'

/* global localStorage:false */
/* global Stomp:false */

let client = null
let cbList = {}

function getFirstItem (obj) {
  return obj[Object.keys(obj)[0]]
}

function connect (cb) {
  if (client) return

  const sessionUuid = localStorage.getItem('sessionUuid')
  var socket = new SockJS('http://localhost:8080/stomp')
  client = Stomp.over(socket)
  // client.debug = null

  client.connect({}, () => {
    client.subscribe(`/topic/hello/${sessionUuid}`, (reply) => {
      let resp = JSON.parse(reply.body)
      cbList[resp.headers.apiId](resp)
      delete cbList[resp.headers.apiId]
    })
    if (cb) cb()
  })
}

function call (msg, cb) {
  function _ () {
    const apiId = genUniqueId()
    getFirstItem(msg).session = {
      uuid: localStorage.getItem('sessionUuid'),
      apiId: apiId
    }
    cbList[apiId] = cb
    client.send('/app/hello', {}, JSON.stringify(msg))
  }
  if (!client) {
    connect(_)
  } else {
    _()
  }
}

export default {
  connect,
  call
}
