'use strict';
require('styles/Studio.scss')
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

var AMUIReact = require('amazeui-react');
var Button = AMUIReact.Button;
var Icon = AMUIReact.Icon;


//获取用户信息
//获取 img src

class Studio extends React.Component {
  constructor(props) {
    super(props);
  }

  //返回
  _showDocEditor() {

  }

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
            <ul>
              <li><Link to='/studio/docs'>我的文档</Link></li>
              <li><a href="#">协作消息</a></li>
              <li><Link to="/studio/trash"><Icon icon="trash" /> 回收站</Link></li>
            </ul>
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Studio;
