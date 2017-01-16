/**
 * Created by st0001 on 2016/12/14.
 */

var Bos=require('bce-sdk-js');
var crypto = require('crypto');

const config = {
    endpoint: "http://gz.bcebos.com",         //传入Bucket所在区域域名
    credentials: {
        ak: "6bb013b74f43441aa2961130a550837d",         //您的AccessKey
        sk: "114576782dd448b89c8e4b2b2db551be"      //您的SecretAccessKey
    }
};

var client = new Bos.BosClient(config);
module.exports={
    createBucket:function(phone) {
        // var name = 'braitsch';
        var hash = crypto.createHash('md5').update(phone.toString()).digest('hex');
        var name='mireco-'+phone+'-'+hash;
        client.createBucket(name)
            .then(function(res) {

            });
        return name;
    }
}