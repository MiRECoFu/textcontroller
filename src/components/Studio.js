'use strict';
require('styles/Studio.scss')
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router'

var AMUIReact = require('amazeui-react');
var Button = AMUIReact.Button;
var Icon = AMUIReact.Icon;

var Storage = require('../storage/storage.js');

let presetDatas = require('../data/docData.json');
let myDocs = [];
let deletedDocs = [];
for(let i in presetDatas){
  if(presetDatas[i].deleted){
    deletedDocs.push(presetDatas[i]);
  } else {
    myDocs.push(presetDatas[i]);
  }
}

console.log(myDocs);
//获取用户信息
//获取 img src

class Studio extends React.Component {
  constructor(props) {
    super(props);
  }

  //返回
  _showDocEditor() {

  }

  //新建
  _newItem() {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);
    let newDoc = {
      total: 0,
      title: "未命名",
      id: time.substr(4),
      data: []
    }
    myDocs.push(newDoc);
    this.setState({
      docsCount: myDocs.length
    })
    Storage.set('docs', myDocs);
  }

  //

  render() {

    return (
      <div>
        <div className="header">
          <button
            onClick={()=>{this._showDocEditor()}}
          >返回</button>
          <div className="studio-name">xx工作室</div>
          <img src="" alt="头像" className="avatar"/>
        </div>
        <div className="main">
          <div className="nav">
            <div
              className="new-doc"
              onClick={()=>{this._newItem()}}
            >新建</div>
            <ul>
              <li><Link to='/studio'>我的文档</Link></li>
              <li><a href="#">协作消息</a></li>
              <li><a href="#"><Icon icon="trash" /> 回收站</a></li>
            </ul>
          </div>
          <div className="content">
            {
              myDocs.map(function(data){
                let docUrl = "/studio/docs/" + data.id;
                return (<Link to={docUrl} key={data.id} className="doc-item">{data.title || "未命名"}</Link>);
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Studio;
