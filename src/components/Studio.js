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
      <div className="studio-body">
        <div className="header">
          <div
            className="back-home"
            onClick={()=>{this._showDocEditor()}}
          >首页</div>
          <div className="studio-name">小白工作室</div>
          <img src="images/avatar.jpg" alt="头像" className="avatar"/>
        </div>
        <div className="main">
          <div className="nav">
            <img src="images/avatar.jpg" alt="头像" className="nav-avatar"/>
            <ul>
              <li><Link to='/studio/docs'><Icon icon="book" /><span>我的文档</span></Link></li>
              <li><a href="#"><Icon icon="comment" /><span>协作消息</span></a></li>
              <li><Link to="/studio/trash"><Icon icon="trash" /><span>回收站</span></Link></li>
            </ul>
          </div>
          <div className="main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Studio;
