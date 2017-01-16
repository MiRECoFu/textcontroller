/**
 * Created by G on 2016/12/13.
 */

var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var $sdk = require('./bossdk');

// database pool
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// return json
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '500',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // get params
            var param = req.query || req.params;

            var bucket = $sdk.createBucket(param.phone);
            // insert
            connection.query($sql.insert, [bucket,param.phone, param.password], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg: bucket
                    };
                }

                // return json
                jsonWrite(res, result);

                // release connection
                connection.release();
            });
        });
    },

    search: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // get params
            var param = req.query || req.params;

            //check whether phone is valid
            connection.query($sql.queryByPhone,[param.phone], function (err, result) {
                if (typeof result[0] == 'undefined') {
                    result = {
                        code: 100,
                        msg: 'id does not exist'
                    }
                }

                //check whether password valid
                else if (result[0].password != param.password){
                    result = {
                        code: 101,
                        msg: 'password invalid'
                    }

                }else{
                    result = {
                        code: 200,
                        msg: result[0].bucket
                    };
                }
                jsonWrite(res, result);

                // release connection
                connection.release();
            })


        });
    }


};

