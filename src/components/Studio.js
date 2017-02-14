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
              <li><a href="#">协作消息</a></li>
              <li><a href="#"><Icon icon="trash" /> 回收站</a></li>
            </ul>
          </div>
          <div className="content">
            {
              presetDatas.map(function(data, i){
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