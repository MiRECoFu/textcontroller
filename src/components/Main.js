require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import {
  BosClient
} from 'bce-sdk-js';

import AMUIReact from 'amazeui-react';
var Button = AMUIReact.Button;
var Input = AMUIReact.Input;
// var Icon = AMUIReact.Icon;
const config = {
  endpoint: 'http://gz.bcebos.com', //传入Bucket所在区域域名
  credentials: {
    ak: '6bb013b74f43441aa2961130a550837d', //您的AccessKey
    sk: '114576782dd448b89c8e4b2b2db551be' //您的SecretAccessKey
  }
};

let bucket = 'my-bucket';
let key = 'hello.js';
let client = new BosClient(config);

/*
  client.putObjectFromString(bucket, key, 'hello world')
    .then(response => console.log(response))    // 成功
    .catch(error => console.error(error));
    */

//拿到储存章节信息的json文件，转化为数组

let Datas = require('../data/chapData.json');
let chapterDatas = Datas.data;



//单个章节节点组件
class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      chidvisible: false,
      key: '',
    };
  }

  //点击为chapterDatas数组添加新的一组章节数据项

  _add() {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);
    let count = this.state.count;
    count++;
    this.setState({
      count,
    })
    let nextChap = {
      chapterId: time.substr(4),
      chapterName: count,
      mirror: false,
      chapterSum: '',
      childChap: [],
    }

    // console.log(count + 'add')
    chapterDatas.push(nextChap);
  }


  //点击删除某一章节节点信息
  _delete(obj) {
    let count = this.state.count;
    count--;
    this.setState({
      count,
    })

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
      count,
    })

    let nextChap = {
      chapterId: time.substr(4),
      chapterName: count,
      mirror: true,
      chapterSum: '',
      childChap: [],
    };

    // chapterDatas.push(nextChap);
    chapterDatas.splice(chapterDatas.indexOf(obj) + 1, 0, nextChap);
  }

  _showChid(obj, key) {
    this.setState({
      key: key,
      chidvisible: true,
    });

  }

  //创建子章节
  _createChild(obj) {
    let data = obj.childChap;

  }


  // //删除子章节
  // _deletechild(arr, item) {
  //   let ccount = arr.length;
  //   ccount--;
  //   this.setState({
  //     childCont: ccount
  //   })
  //   arr.splice(arr.indexOf(item), 1);
  // }


  // //修改章节名
  // _onChange(key) {
  //   chapterDatas[key].chapterName = this.refs['cNameValue' + key].value;

  //   this.setState({
  //     nameChange: true
  //   });
  // }


  // //修改子章节名
  // _childChange(arr, kk, key) {
  //     arr[kk].childName = this.refs['cdNameValue' + kk + key].value;

  //     this.setState({
  //       childNameChange: true
  //     });
  //   }

  _showArticle() {

  }
  render() {
    var flag = this.state.chidvisible;
    let parentObj;
    let child;
    if (flag) {
      parentObj = chapterDatas.splice(key, 1);
      child = parentObj[0].childChap;
      console.log(child)
    }
    return (
      <div className="parent">
      <div className="header">top</div>
        <div className="main">
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
                  let id = data.chapterId;
                  let name = data.chapterName;
                  let text = data.chapterSum;
                  return(
                    <div 
                      className="chapBox"
                      onClick={()=>{this._showChid(data,key)}}
                    >
                      <div className="chapItem">
                        <span>Chapterid:{id} </span>
                        <div>章节名: {name}</div>
                        <div>章节简介: {text}{data.mirror?"副本":null}</div>
                        <Button amSize="xs" className="setting">编辑</Button>
                        <span className="editChapP">
                            <Button  amSize="xs" onClick={()=>{this._delete(data)}}>删除</Button>
                            <Button  amSize="xs" onClick={()=>{this._createBre(data)}}>创建副本</Button>
                            <Button  amSize="xs" onClick={()=>{this._createChild(data)}}>创建子章节</Button>
                            <Input 
                              className="inputChap"
                              radius 
                              placeholder="输入章节名"
                              onChange={()=>{this._onChange(data)}}
                            />
                        </span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="left2">
            {
              flag&&<div>
              {
                child.map((data)=>{
                  let childId = data.chapterId;
                  let childName = data.chapterName;
                  return(
                    <div 
                      className = "childChapBox"
                      onClick={()=>{this._showArticle(childId)}}
                    >
                      <div className='childItem'>
                        <span>{childId}</span>
                        <span>{childName}</span>
                        <Button  amSize="xs" onClick={()=>{this._deletechild(child,data)}}>删除</Button>
                        <input
                          type="text"
                          onChange={()=>{this._childChange()}}
                        />
                      </div>
                    </div>
                  );
                })
              }
              </div>
            }
          </div>
          <div className="center">
            <div className="inner">center</div>
          </div>
          <div className="right">right</div>
        </div>
        <div className="footer">bottom</div>
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