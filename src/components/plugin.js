
//require('jquery');
var $tipSec = [];
(function () {

    // 获取 wangEditor 构造函数和 jquery
    var E = window.wangEditor;
    var $ = require('jquery');
    // 通过 E.plugin 注入插件代码
    E.plugin(function () {
        // 此处的 this 指向 editor 对象本身
        var editor = this;
        var $txt = editor.$txt;
        var txt = editor.txt;
        var $txt = txt.$txt;
        var $currentTarget;

        var isRendered = false;
        var $toolbar = $('<div class="txt-toolbar"></div>');
        var $triangle = $('<div class="tip-triangle"></div>');
        //var $delete = $('<a href="#"><i class="wangeditor-menu-img-trash-o"></i></a>');
        //var $zoomSmall = $('<a href="#"><i class="wangeditor-menu-img-search-minus"></i></a>');
        var $zoomBig = $('<a href="#"><i class="wangeditor-menu-img-search-plus"></i></a>');

        function render() {
            if (isRendered) {
                return;
            }

            // 绑定事件
            bindEvent();

            // 拼接 渲染到页面上
            $toolbar.append($triangle)
                    .append($zoomBig);
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
            $zoomBig.click(function (e) {
              $tipSec.push(<input />);
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



        /*
        $txt.on('click', 'p', function (e) {
            var p = e.currentTarget;
            var $p = $(e.currentTarget);
            $p.addClass('choosed');
            console.log(p.textContent);
            console.log(p.className);
        });
        */
        $txt.on('mouseover', 'p', function (e) {
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

        }).on('click keypress scroll', function (e) {
            setTimeout(hide, 100);
        });
        E.$body.on('click keypress scroll', function (e) {
            setTimeout(hide, 100);
        });
    });

})();
module.exports = $tipSec
