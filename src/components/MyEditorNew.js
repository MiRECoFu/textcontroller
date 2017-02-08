'use strict';
var wangeditor = require('wangeditor')

import React from 'react';
import ReactDOM from 'react-dom';


class RichEditorExample extends React.Component {
  componentDidMount() {
    var div = this.refs["div1"];
    // 生成编辑器

    var editor = new wangEditor(div);
    editor.config.uploadImgUrl = '/server/upload/img';
    editor.config.uploadParams = {
      'phone': localStorage.phone
    };
    editor.config.uploadImgFileName = 'photo';
    editor.create();
  }
  render() {
    // console.log(div);
    return (
      <div
        ref = "div1"
        style = {{height: '1000px',
                  width: '100%'}}
      ></div>
    );
  }
}

export default RichEditorExample;
