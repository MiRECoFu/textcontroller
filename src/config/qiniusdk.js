'use strict';

import React from 'react';

var qiniu = require("qiniu");

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

qiniu.conf.ACCESS_KEY = '49NzYx9uDHH8sYL6EvYJa62PjVNKnJKdMKUSOB8b'; //您的AccessKey
qiniu.conf.SECRET_KEY = '4600SeDVpWFKZ7KTLdmJZoea_iIhi-U-ou_pi-vn'; //您的SecretAcc


var client = {}

client.uploadFile = function() {

}



module.exports = client