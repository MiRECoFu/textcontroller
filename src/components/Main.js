require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import {
  BosClient
} from 'bce-sdk-js';
import {Editor, EditorState} from 'draft-js';
import AMUIReact from 'amazeui-react';
var Button = AMUIReact.Button;
var Form = AMUIReact.Form;
var Input = AMUIReact.Input;
// var Icon = AMUIReact.Icon;

const config = {
  endpoint: 'http://gz.bcebos.com', //传入Bucket所在区域域名
  credentials: {
    ak: '6bb013b74f43441aa2961130a550837d', //您的AccessKey
    sk: '114576782dd448b89c8e4b2b2db551be' //您的SecretAccessKey
  }
};
/*
let bucket = 'my-bucket';
let key = 'hello.js';
let client = new BosClient(config);


  client.putObjectFromString(bucket, key, 'hello world')
    .then(response => console.log(response))    // 成功
    .catch(error => console.error(error));
*/
//拿到储存章节信息的json文件，转化为数组

let Datas = require('../data/chapData.json');
let chapterDatas = Datas.data;
let child = [];

var Storage = require('../storage/storage.js');

Storage.set('user', Datas)
console.log(Storage.get('user'))


//单个章节节点组件
class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      mainindex: chapterDatas.length + 1,
      chidvisible: false,
      key: 0,
      namevaluechange: false,
      childcount: 0,
      treechange: false
    };
  }

  componentWillMount() {
    child = chapterDatas[0].childChap;
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
      childChap: []
    }

    // console.log(count + 'add')
    chapterDatas.push(nextChap);
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
      childcount: 0
    })


    child = [];
    chapterDatas.splice(chapterDatas.indexOf(obj), 1);

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
  }

  _showChid(key, e) {
    let parent = chapterDatas[key];

    child = parent.childChap;
    if (parent == []) {
      child = [];
    }
    if (chapDatas.length == 0) {
      child = [];
    }
    //console.log(child[0].chapterName);
    this.setState({
      key: key,
      chidvisible: true,
      childcount: child.length
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
  }

  //删除子章节
  _deletechild(child, key) {
    this.setState({
      chidvisible: true,
      childcount: child.length - 1
    })
    child.splice(key, 1);
    chapterDatas[this.state.key].childChap = child;
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
    console.log(child)
    chapterDatas[this.state.key].childChap = child;
  }
  _showtree() {
    let treebtn = this.refs['mask'];
    treebtn.style.display = 'block';
    let backbtn = this.refs['back'];
    backbtn.style.display = 'block';
    this.setState({
      treechange: true
    });
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

  render() {
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


    return (
      <div className="parent">
      <div className="header">top</div>
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
                  return(
                    <div
                      className="chapBox"
                      onClick={()=>{this._showChid(key,event)}}
                    >
                      <div className="chapItem" >
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
              <MarkDown />
              <div>word版富文本编辑器</div>
              <MyEditor />
            </div>
          </div>
          <div className="right">right</div>
        </div>
        <div className="footer">bottom</div>
      </div>
    );
  }
}
class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  _showMd() {
    this.setState({
      value: this.refs.md.getValue()
    });
  }
  render() {
    // var input = '# This is a header\n\nAnd this is a paragraph';
    if (this.state.value) {
      var input = this.state.value;
    }

    return (
      <div>
        <Form>
          <Input
            className="markdownInput"
            id="markdownInput"
            type="textarea"
            label="文本域"
            placeholder="说点神马..."
            ref="md"
            onChange={()=>{this._showMd()}}
          />
        </Form>
        <div className="markdown">
          <ReactMarkdown className="reactmd" source={input} />
        </div>
      </div>
    );
  }
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    //this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  render() {
    return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} className="editorInput"/>
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
    return (
      <section className="workplace" ref="workplace">
        <section className="controllnav">
            <ChapIndexs/>
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
