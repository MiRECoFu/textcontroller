'use strict'

module.exports = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },
  api: {
    base: 'http://mireco.top:3000/users/getFromBos',
  }
}