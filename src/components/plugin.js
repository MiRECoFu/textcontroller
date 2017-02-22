var Storage = require('../storage/storage.js');

import {
  BosClient
} from 'bce-sdk-js';

const config = {
  endpoint: 'http://gz.bcebos.com', //传入Bucket所在区域域名
  credentials: {
    ak: '6bb013b74f43441aa2961130a550837d', //您的AccessKey
    sk: '114576782dd448b89c8e4b2b2db551be' //您的SecretAccessKey
  }
};

let bosClient = new BosClient(config);

const bucketName = 'mireco-15651783396-f753f3fb1f3150e6ccb3f0f9666a347d';

let objname = 'tip.json';

let tipData = {
  "data": []
};
// Storage.remove('comment')

//require('jquery');
var $tipSec = [];
(function() {

  // 获取 wangEditor 构造函数和 jquery
  var E = window.wangEditor;
  var $ = require('jquery');
  // 通过 E.plugin 注入插件代码
  E.plugin(function() {
    // 此处的 this 指向 editor 对象本身
    var editor = this;
    var $txt = editor.$txt;
    var txt = editor.txt;
    var $txt = txt.$txt;
    var $currentTarget;

    var isRendered = false;
    var $toolbar = $('<div class="txt-toolbar"></div>');
    //var $triangle = $('<div class="tip-triangle"></div>');
    //var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
    //var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
    var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');
    var $inputBar = $('<input />');
    var $tipDiv = $('<div></div>');
    var $okBtn = $('<button>确定</button>');
    var $cancelBtn = $('<button>取消</button>');

    function render() {
      if (isRendered) {
        return;
      }

      // 绑定事件
      bindEvent();

      // 拼接 渲染到页面上
      $toolbar.append($inputBar)
        .append($okBtn)
        .append($cancelBtn);
      editor.$editorContainer.append($toolbar);
      isRendered = true;
    }

    // 绑定事件
    function bindEvent() {
      // 统一执行命令的方法
      var commandFn;

      function command(e, callback) {
        if (commandFn) {
          editor.customCommand(e, commandFn, callback);
        }
      }
      // 放大
      $inputBar.click(function(e) {
        $toolbar.show();
      });
      $inputBar.focusin(function(e) {
        $toolbar.show();
      });
    }
    // 显示 toolbar
    function show() {
      if ($currentTarget == null) {
        return;
      }
      $currentTarget.addClass('clicked');
      var tablePosition = $currentTarget.position();
      var tableTop = tablePosition.top;
      var tableLeft = tablePosition.left;
      var tableHeight = $currentTarget.outerHeight();
      var tableWidth = $currentTarget.outerWidth();

      // --- 定位 toolbar ---

      // 计算初步结果
      var top = tableTop + tableHeight;
      var left = tableLeft;
      var marginLeft = 0;

      var txtTop = $txt.position().top;
      var txtHeight = $txt.outerHeight();
      if (top > (txtTop + txtHeight)) {
        // top 不得超出编辑范围
        top = txtTop + txtHeight;
      }

      // 显示（方便计算 margin）
      $toolbar.show();
      // 计算 margin
      var width = $toolbar.outerWidth();
      marginLeft = $txt.outerWidth();

      // 定位
      $toolbar.css({
        top: top + 5,
        left: left,
        'margin-left': marginLeft
      });
    }

    // 隐藏 toolbar
    function hide() {
      if ($currentTarget == null) {
        return;
      }
      $currentTarget.removeClass('clicked');
      $currentTarget = null;
      $toolbar.hide();
    }

    //添加 tip 至评论区
    function renderComment() {
      let value = $inputBar.val();
      // alert(tipStr)
      if (value.length !== 0) {
        let nextTip = {
          "value": value
        };
        tipData.data.push(nextTip);
        Storage.set('comment', tipData);
        $tipSec.push(tipData);
        // console.log(tipData)
        // let tipStr = Storage.get('comment');
        let tipStr = JSON.stringify(tipData);
        bosClient.putObjectFromBlob(bucketName, objname, tipStr)
          .then(response => console.log('success')) // 成功
          // .catch(error => console.error(error));
      }
      $inputBar.val('');
    }

    $txt.on('mouseover', 'p', function(e) {
      var $table = $(e.currentTarget);

      // 渲染
      render();

      if ($currentTarget && ($currentTarget.get(0) === $table.get(0))) {
        setTimeout(hide, 100);
        return;
      }

      // 显示 toolbar
      $currentTarget = $table;
      show();

      // 阻止冒泡
      e.preventDefault();
      e.stopPropagation();

    }).on('click keypress scroll', function(e) {
      setTimeout(hide, 100);
    });

    E.$body.on('scroll', function(e) {
      setTimeout(hide, 100);
    });

    //点击确认按钮
    $okBtn.on('click', function() {
      renderComment();
    });

  });

})();

module.exports = {
  $tipSec,

}
