'use strict'

import queryString from 'query-string'
import _ from 'lodash'
// import fetch from 'node-fetch';
// import Mock from 'mockjs'

// import config from './base'

var request = {}

//封装方法
request.get = function(url, params) {
  if (params) {
    url += '?' + queryString.stringify(params);
  }
  return fetch(url)
    .then((response) => response.json())
    // .then((response) => Mock.mock(response))
}

// request.post = function(url, body) {
//   var options = _.extend(config.header, {
//     body: JSON.stringify(body)
//   })
//   return fetch(url)
//     .then((response) => response.json())
// .then((response) => Mock.mock(response))
// }

module.exports = request