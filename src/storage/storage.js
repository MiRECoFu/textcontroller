'use strict'

var storage = {}

//封装方法
storage.get = function(key) {
  var strStoreDate = window.localStorage ? localStorage.getItem(key) : Cookie.read(key);
  return strStoreDate;
}
storage.set = function(key, data) {
  var strData = JSON.stringify(data)
  if (window.localStorage) {
    localStorage.setItem(key, strData);
  } else {
    Cookie.write(key, strData);
  }
}

module.exports = storage