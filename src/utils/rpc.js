import SockJS from 'sockjs-client'
import 'stompjs/lib/stomp.js'
import { genUniqueId } from './utils'

/* global localStorage:false */
/* global Stomp:false */

let client = null
let connecting = false
let waitingList = [] // function waiting list before connected
let cbList = {}

function getFirstItem (obj) {
  return obj[Object.keys(obj)[0]]
}

function connect (cb) {
  if (client && client.connected && connecting) return
  connecting = true
  const sessionUuid = localStorage.getItem('sessionUuid')
  var socket = new SockJS('http://localhost:8080/stomp')
  socket.onopen = () => {
    connecting = false
  }
  client = Stomp.over(socket)
  // client.debug = null

  client.connect({}, () => {
    client.subscribe(`/topic/hello/${sessionUuid}`, (reply) => {
      let resp = JSON.parse(reply.body)
      cbList[resp.headers.apiId](resp)
      delete cbList[resp.headers.apiId]
    })
    if (waitingList.length > 0) {
      waitingList.forEach((_) => {
        _()
      })
      waitingList.length = 0
    }
  })
}

function call (msg, cb) {
  let _ = function () {
    const apiId = genUniqueId()
    getFirstItem(msg).session = {
      uuid: localStorage.getItem('sessionUuid'),
      apiId: apiId
    }
    cbList[apiId] = cb
    client.send('/app/hello', {}, JSON.stringify(msg))
  }
  console.log(client)
  console.log(connecting)
  if (!client || !client.connected) {
    waitingList.push(_)
    if (!connecting) {
      connect()
    }
  } else {
    _()
  }
}

export default {
  connect,
  call
}
