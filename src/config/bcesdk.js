'use strict';

import React from 'react';

import {
  BosClient
} from 'bce-sdk-js';

// function type(obj) {
//   return Object.prototype.toString.call(obj).slice(8, -1);
// }

const config = {
  endpoint: 'http://gz.bcebos.com', //传入Bucket所在区域域名
  credentials: {
    ak: '6bb013b74f43441aa2961130a550837d', //您的AccessKey
    sk: '114576782dd448b89c8e4b2b2db551be' //您的SecretAccessKey
  }
};

let bosClient = new BosClient(config);



// let bucket = 'my-bucket';
// let key = 'hello.js';
// let client = new BosClient(config);


//   client.putObjectFromString(bucket, key, 'hello world')
//     .then(response => console.log(response))    // 成功
//     .catch(error => console.error(error));


var client = {}

//封装方法
client.upload = function(bucketName, obj, path) {
  if (!path) {
    //如果是章节信息
    // let data = obj;
    let objname = 'datas.js';
    if (obj == null) {
      obj = 'helloworld'
    }
    // 以字符串形式上传
    bosClient.putObjectFromBlob(bucketName, objname, obj)
      .then(response => console.log(response)) // 成功
      .catch(error => console.error(error));
  } else {
    //以文件形式上传
    bosClient.putObjectFromFile(bucketName, obj, path)
      .then(response => console.log(response)) // 成功
      .catch(error => console.error(error));
  }

}

client.post = function(key, data) {

}

module.exports = client