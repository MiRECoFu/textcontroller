'use strict';
var wangeditor = require('wangeditor')

import React from 'react';
import ReactDOM from 'react-dom';


class RichEditorExample extends React.Component {
  render() {
    var div = this.refs["div1"];
    // 生成编辑器
    var editor = new wangEditor(div);
    editor.create();
    console.log(div);
    return (
      <div 
        ref = "div1"
      ></div>
    );
  }
}

export default RichEditorExample;