require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router'
var $ = require('jquery');
// import Client from '../config/bcesdk.js'
// import Client from '../config/qiniusdk.js'
import MyEditor from './MyEditorNew.js'
// import TipContent from './TipContent.js'

import AMUIReact from 'amazeui-react';
var Button = AMUIReact.Button;
var Form = AMUIReact.Form;
var Input = AMUIReact.Input;
// var Icon = AMUIReact.Icon;



var Storage = require('../storage/storage.js');
// var tipSec = require('../components/plugin.js');
// console.log(tipSec);

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

let objname = 'datas.json'

// function type(obj) {
//   return Object.prototype.toString.call(obj).slice(8, -1);
// }
let Datas = {};
let chapterDatas = [];
let child = [];

//url get post
import request from '../config/request.js'
import base from '../config/base.js'

//拿到储存章节信息的json文件，转化为数组
request.get(base.api.base, {
    bucket: bucketName,
    key: objname
  })
  .then((data) => {
    Datas = data;
    chapterDatas = Datas.data;
    // console.log(chapterDatas[0])
  })


// let chapterStr = Storage.get('user');
// console.log(typeof chapterStr)
// bosClient.putObjectFromBlob(bucketName, 'datatest.json', 'hello world')
// .then(response => console.log("success"))
//单个章节节点组件

class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    // 这里可以从URL获取到Doc的ID，然后请求服务器获得具体的文章，简化开发默认为预设数据第一个
    // console.log(this.props.docId);
    child = chapterDatas ? chapterDatas[0].childChap : {};
    this.state = {
      count: 0,
      mainindex: chapterDatas.length + 1,
      chidvisible: false,
      key: 0,
      namevaluechange: false,
      childcount: 0,
      treechange: false,
      childName: child ? child[0].chapterName : '',
      edit: false
    };
  }


  //点击为chapterDatas数组添加新的一组章节数据项

  _add() {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);
    let count = this.state.count;
    count++;
    let main = this.state.mainindex + 1;
    this.setState({
      count: count,
      mainindex: main
    })
    let nextChap = {
      mainIndex: this.state.mainindex,
      chapterId: time.substr(4),
      chapterName: '请点击编辑命名',
      mirror: false,
      chapterSum: '',
      childChap: [],
      mirrorshow: false
    }

    // console.log(count + 'add')
    chapterDatas.push(nextChap);
    Storage.set('user', Datas)
  }


  //点击删除某一章节节点信息
  _delete(obj) {
    let main;
    let count = this.state.count;
    count--;
    if (!obj.mirror) {
      main = this.state.mainindex;
      main--;
    } else {
      main = this.state.mainindex;
    }
    this.setState({
      count: count,
      mainindex: main,
      childcount: 0,
      edit: true
    })


    child = [];
    chapterDatas.splice(chapterDatas.indexOf(obj), 1);
    Storage.set('user', Datas)
    this.setState({
      edit: false
    });
  }

  //创建副本
  _createBre(obj) {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);
    let count = this.state.count;
    count++;
    this.setState({
      count: count
    })

    let nextChap = {
      mainIndex: obj.mainIndex,
      chapterId: time.substr(4),
      chapterName: '请点击编辑命名',
      mirror: true,
      chapterSum: '',
      childChap: []
    };

    chapterDatas.splice(chapterDatas.indexOf(obj) + 1, 0, nextChap);
    Storage.set('user', Datas)
  }

  _showChid(key, e) {
    let parent = chapterDatas[key];

    if (parent == []) {
      child = [];
    }
    if (chapterDatas.length == 0) {
      child = [];
    }

    if (!this.state.edit) {
      child = parent.childChap;
      this.setState({
        childName: child[0] ? child[0].chapterName : '',
        childcount: child.length,
      });
    }
    // console.log(child)
    //console.log(child[0].chapterName);
    this.setState({
      key: key,
      chidvisible: true,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  // 显示编辑区域
  _showInputChap(key) {
    let obj = this.refs['inputChap' + key];
    obj.style.display = 'block';
  }

  // 点击全选文本
  _select(key) {
    let obj = this.refs['inputChap' + key];
    obj.select();
  }

  //编辑章节名
  _settingName(key) {
    chapterDatas[key].chapterName = this.refs['inputChap' + key].value;
    this.setState({
      namevaluechange: true
    });
    Storage.set('user', Datas)
  }

  // 隐藏编辑区域
  _hide(e, key) {
    let obj = this.refs['inputChap' + key];
    if (e && e.keyCode == 13) { // enter 键
      // alert('enter')
      obj.style.display = 'none';
    }
  }

  //创建新的子章节
  _newchild() {
    if (chapterDatas.length == 0) {
      child.push();
    } else {
      child.push({
        mirror: false,
        chapterId: '',
        chapterName: '子章节'
      });
    }
    chapterDatas[this.state.key].childChap = child;
    this.setState({
      chidvisible: true,
      childcount: child.length
    });
    Storage.set('user', Datas)
  }

  //删除子章节
  _deletechild(child, key) {
    this.setState({
      chidvisible: true,
      childcount: child.length - 1
    })
    child.splice(key, 1);
    chapterDatas[this.state.key].childChap = child;
    Storage.set('user', Datas)
  }

  //显示子章节文本输入框
  _showInputChild(key) {
      let obj = this.refs['inputChild' + key];
      obj.style.display = 'block';
    }
    // 编辑子章节名
  _settingChildName(child, key) {
      child[key].chapterName = this.refs['inputChild' + key].value;
      this.setState({
        namevaluechange: true
      });
    }
    // 隐藏子章节文本输入框
  _hideChild(e, key) {
    let obj = this.refs['inputChild' + key];
    if (e && e.keyCode == 13) { // enter 键
      // alert('enter')
      obj.style.display = 'none';
    }
  }

  _createChildBre(child, key) {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);

    let nextChap = {
      mirror: true,
      chapterId: time.substr(4),
      chapterName: '请点击编辑命名',
    };
    this.setState({
      childcount: child.length + 1
    });
    child.splice(key + 1, 0, nextChap);
    // console.log(child)
    chapterDatas[this.state.key].childChap = child;
  }

  //显示文本结构
  _showSelf(obj, key, e) {
    let childName = obj.chapterName;
    this.setState({
      childName,
    });
    // console.log(childName)
    e.stopPropagation();
    e.preventDefault();
  }

  _showtree() {
    let treebtn = this.refs['mask'];
    treebtn.style.display = 'block';
    let backbtn = this.refs['back'];
    backbtn.style.display = 'block';
    this.setState({
      treechange: true
    });
    Storage.set('user', Datas)
  }
  _back() {
      let treebtn = this.refs['mask'];
      treebtn.style.display = 'none';
      let backbtn = this.refs['back'];
      backbtn.style.display = 'none';
      this.setState({
        treechange: true
      });
    }
    /*
  _showMirror(main) {
    let $mirrors = $('.chapItem' + main + 'true');
    console.log($mirrors);
    if ($mirrors.css('display', 'block')) {
      $mirrors.css('display', 'none');
    } else {
      $mirrors.css('display', 'block');
    }
    this.setState({
      mirrorshow: !this.state.mirrorshow
    });
  }
*/
  render() {
    // Storage.set('user', Datas)
    let chapterStr = JSON.stringify(Storage.get('user'));
    // console.log(chapterStr)
    bosClient.putObjectFromBlob(bucketName, objname, chapterStr)
      .then(response => console.log("success")) // 成功
      // .catch(error => console.log(error));

    //取到一共有多少个主章节
    let lastindex;
    if (chapterDatas.length == 0) {
      lastindex = 0;
    } else {
      lastindex = chapterDatas[chapterDatas.length - 1].mainIndex;
    }
    let subChap = [];
    //将mainIndex相同的章节放在一个数组中

    for (let i = 1; i <= lastindex; i++) {
      subChap[i - 1] = [];
      for (let j = 0; j < chapterDatas.length; j++) {
        if (chapterDatas[j].mainIndex == i) {
          subChap[i - 1].push(chapterDatas[j]);
        }
      }
    }

    subChap.forEach((item, index) => {
      if (item.length == 0) {
        subChap.splice(index, 1);
      }
    });
    subChap.forEach((item, index) => {
      if (item.length == 0) {
        subChap.splice(index, 1);
      }
    });

    return (
      <div className="parent">
      <div className="header">
        <Link to="/studio" >返回我的工作室</Link>
      </div>
        <div className="main">
          <div className="mask" ref='mask'>
            <Chaptree data={subChap}/>
          </div>
          <div className="left1">
            <div className="fatherChap">
              <Button
                className="newChap"
                onClick = {
                 this._add.bind(this)
                }
              >
                +
              </Button>
              {
                chapterDatas.map((data)=>{
                  let key = chapterDatas.indexOf(data);
                  let index = data.mainIndex;
                  let name = data.chapterName;
                  let text = data.chapterSum;
                  let mirror = data.mirror;
                  let main = data.mainIndex;
                  return(
                    <div className={"chapItem"+main+mirror} >
                    <div
                      className={"chapBox"+mirror}
                      onClick={()=>{this._showChid(key,event)}}
                    >
                      <div>
                        <div>{key+1}.章节名: {name}</div>
                        <div>章节简介: {text}{data.mirror?'副本':null}</div>
                        <span className="editChapP">
                          <Button amSize="xs" onClick={()=>{this._showInputChap(key)}}>编辑</Button>
                          <Button amSize="xs" onClick={()=>{this._delete(data)}}>删除</Button>
                          <Button amSize="xs" onClick={()=>{this._createBre(data)}}>创建副本</Button>
                          <input
                            className="inputChap"
                            ref={'inputChap'+key}
                            placeholder="输入章节名，按回车确定"
                            type="text"
                            onChange={()=>{this._settingName(key)}}
                            onKeyDown={(e)=>{this._hide(e,key)}}
                            onFocus={()=>{this._select(key)}}
                          />
                        </span>
                      </div>

                    </div>
                    </div>
                  );
                })
              }
              <Button amSize='lg' className="treebtn" onClick = {
               this._showtree.bind(this)
              }>查看我的所有章节结构</Button>
              <button className="backbtn" ref="back" onClick = {
               this._back.bind(this)
             }>返回</button>
            </div>
          </div>
          <div className="left2">
            <Button className="newchild" onClick={()=>this._newchild()}>创建新的子章节   </Button>
            {

                child.map((data)=>{
                  let key = child.indexOf(data);
                  let childId = data.chapterId;
                  let childName = data.chapterName;

                  return(
                    <div
                      className = "childChapBox"
                      onClick={()=>{this._showSelf(data,key,event)}}
                    >
                      <div className='childItem'>
                        <span>{childId}</span>
                        <span>{childName}</span>
                        <br />
                        <Button amSize="xs" onClick={()=>{this._showInputChild(key)}}>编辑</Button>
                        <Button amSize="xs" onClick={()=>{this._deletechild(child,key)}}>删除</Button>
                        <Button amSize="xs" onClick={()=>{this._createChildBre(child,key)}}>创建副本</Button>
                        <input
                          className="inputChild"
                          ref={'inputChild'+key}
                          type="text"
                          placeholder="输入子章节名，按回车确定"
                          onChange={()=>{this._settingChildName(child,key)}}
                          onKeyDown={(e)=>{this._hideChild(e,key)}}
                        />
                      </div>
                    </div>
                  );
                })

            }
          </div>
          <div className="center">
            <div className="inner">
              <div>word版富文本编辑器</div>
              <div className="chapNameInputTest">{this.state.childName}</div>
              <Input placeholder="父章节名" className="parentchapName"/>
              <Input placeholder="子章节名" className="chapNameInput"/>
              <MyEditor />
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="footer">bottom</div>
      </div>
    );
  }
}

class Chaptree extends React.Component {
  /*
    constructor(props) {
      super(props);
      this.state = {
        cancelMain: false
      };
    }
  */
  render() {
    let subChap = this.props.data;
    // console.log(subChap[0]);
    return (
      <div className="tree">
        <div className="chap-tree">
          {
            subChap.map((data) => {
              let key = subChap.indexOf(data);
              return(
                <div className='chapLine' key={key}>
                  {
                    data.map((d) => {
                      let childtree = d.childChap;

                      return(
                        <div className='chapRow'>
                          {
                            childtree.map((childdata) => {

                              return(
                                <div className='childRow'></div>
                              )
                            })
                          }
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

class AppComponent extends React.Component {

  render() {
    let docId = this.props.params.docId;
    return (
      <section className="workplace" >
        <section className="controllnav">
            <ChapIndexs docId={docId}/>
        </section>
        <section className="editplace">
        </section>
        <section className="tipbar">
        </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;