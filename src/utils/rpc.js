import SockJS from 'sockjs-client'
import 'stompjs/lib/stomp.js'

/* global localStorage:false */
/* global Stomp:false */

let client = null
let cbList = {}

function genUniqueId () {
  function randomString (length, chars) {
    var result = ''
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))]
    return result
  }
  return randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
}

function getFirstItem (obj) {
  return obj[Object.keys(obj)[0]]
}

export function connect (cb) {
  if (client) return

  const sessionUuid = localStorage.getItem('sessionUuid')
  var socket = new SockJS('http://localhost:8080/stomp')
  client = Stomp.over(socket)

  client.connect({}, () => {
    client.subscribe(`/topic/hello/${sessionUuid}`, (reply) => {
      let resp = getFirstItem(JSON.parse(reply.body))
      const apiId = resp.headers.correlationId.split('-')[1]
      cbList[apiId](resp)
      delete cbList[apiId]
    })
    if (cb) cb()
  })
}

export function call (msg, cb) {
  const apiId = genUniqueId()
  getFirstItem(msg).session = {
    uuid: localStorage.getItem('sessionUuid'),
    apiId: apiId
  }
  cbList[apiId] = cb
  client.send('/app/hello', {}, JSON.stringify(msg))
}
