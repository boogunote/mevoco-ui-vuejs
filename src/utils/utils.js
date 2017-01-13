let salt = 0
export function genUniqueId () {
  function randomString (length, chars) {
    var result = ''
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))]
    result += salt
    salt++
    if (salt > 10000000) salt = 0
    return result
  }
  return randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
}

export function isConditionsEqual (conditions, oldConditions) {
  if (!oldConditions || oldConditions.length !== conditions.length) {
    return false
  }
  let isEqual = true
  for (let i in conditions) {
    let found = false
    for (let j in oldConditions) {
      if (conditions[i].name === oldConditions[j].name &&
          conditions[i].op === oldConditions[j].op &&
          conditions[i].value === oldConditions[j].value) {
        found = true
        break
      }
    }
    if (!found) {
      isEqual = false
      break
    }
  }
  return isEqual
}

export function vmCpuQueryExpression (type, hostUuid, vmUuid) {
  var expressionName = 'collectd:collectd_virt_virt_vcpu'
  var exportedInstanceStr = '{exported_instance="' + vmUuid + '",'
  var typeStr = 'type="' + type + '",'
  var hostUuidStr = 'hostUuid="' + hostUuid + '"}'
  if (type === 'total') {
    expressionName = 'collectd:collectd_virt_virt_cpu_total'
    typeStr = ''
  }
  return `${expressionName}${exportedInstanceStr}${typeStr}${hostUuidStr}`
}

export function hostCpuQueryExpression (cpu, type, hostUuid) {
  var expressionName = 'collectd_cpu_percent'
  var cpuStr = '{cpu="' + cpu + '",'
  var typeStr = 'type="' + type + '",'
  var hostUuidStr = 'hostUuid="' + hostUuid + '"}'
  return `${expressionName}${cpuStr}${typeStr}${hostUuidStr}`
}
