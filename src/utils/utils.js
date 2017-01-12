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
