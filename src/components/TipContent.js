'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router'
// var AMUIReact = require('amazeui-react');
// var Button = AMUIReact.Button;
// var Icon = AMUIReact.Icon;


var tipDatas = [];
var Storage = require('../storage/storage.js');

//从百度取得 tip 
import request from '../config/request.js'
import base from '../config/base.js'


const bucketName = 'mireco-15651783396-f753f3fb1f3150e6ccb3f0f9666a347d';

let objname = 'tip.json'

//    拿到储存Tip信息的json文件，转化为数组
request.get(base.api.base, {
    bucket: bucketName,
    key: objname
  })
  .then((tipdata) => {
    tipDatas = tipdata.data;
    // console.log(tipDatas)
  })


// var newComment = Storage.get('comment');


// alert(data)
class TipContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tipData = tipDatas
    return (
      <div>
        
        <div className="tipContent">
          {
            tipData.map((data) => {
              // console.log(tipDatas)
              let key = tipDatas.indexOf(data);
              let value = data.value;
              return (
                <div className = "TipBox">
                  <div className='TipItem'>
                    <span>{key}</span>
                    <span>*********</span>
                    <span>{value}</span>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TipContent;