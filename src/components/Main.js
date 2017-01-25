require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import {
  BosClient
} from 'bce-sdk-js';

import AMUIReact from 'amazeui-react';
var Button = AMUIReact.Button;
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
      addCont: chapterDatas.length,
      clicked: false,
      clickedName: '',
      nameChange: false,
      subNameChange: false,
      childNameChange: false,
      subchildNameChange: false,
      breCont: 0,
      childCont: 0,
      subchildCont: 0
    };
  }

  //点击为chapterDatas数组添加新的一组章节数据项

  _add() {
    let count = this.state.addCont;
    count++;
    this.setState({
        addCont: count,
        breCont: 0,
        childCont: 0
      })
      // console.log(count + 'add')
    chapterDatas.push({
      chapterIndex: this.state.addCont + 1,
      chapterName: chapterDatas.length + 1,
      chapterSum: '',
      childChap: [],
      chapterBre: []
    });

  }


  //点击删除某一章节节点信息
  _delete(obj) {
    let count = this.state.addCont;
    count--;
    //if()
    this.setState({
        addCont: count
      })
      // console.log(count + 'delete')
    chapterDatas.splice(chapterDatas.indexOf(obj), 1);
  }

  //创建副本
  _createBre(obj) {
    let subDatas = obj.chapterBre;
    let bcount = subDatas.length;
    bcount++;
    this.setState({
        breCont: bcount,
        subchildCont: 0
      })

      // console.log(count + 'create')
    //let proObj = chapterDatas.slice(chapterDatas.indexOf(obj), chapterDatas.indexOf(obj) + 1)
    subDatas.push({
      subIndex: subDatas.length + 1,
      subName: '',
      subSum: '',
      subchildChap: []
      //chapterName: proObj[0].chapterName + '副本',
    });
  }

  //创建子章节
  _createChild(obj) {
    let childDatas = obj.childChap,
        ccount = childDatas.length;
    ccount++;
    this.setState({
      childCont: ccount
    })

    childDatas.push({
      childIndex: childDatas.length + 1,
      childName: ''
    });
  }

  //创建副本子章节
  _createsubChild(obj) {
    let subChildDatas = obj.subchildChap,
        sccount = subChildDatas.length;
    sccount++;
    this.setState({
      subchildCont: sccount
    });
    subChildDatas.push({
      subchildIndex: subChildDatas.length + 1,
      subchildName: ''
    });
  }

  //删除副本
  _deleteBre(arr,item) {
    //let subDatas = chapterDatas[chapterDatas.indexOf(obj)].chapterBre;
    let bcount = arr.length;
    bcount--;
    this.setState({
        breCont: bcount
      })
    arr.splice(arr.indexOf(item), 1);
  }

  //删除子章节
  _deletechild(arr,item) {
    let ccount = arr.length;
    ccount--;
    this.setState({
      childCont: ccount
    })
    arr.splice(arr.indexOf(item),1);
  }

//删除副本的子章节


//点击整个章节模块时
  _onClick() {

    this.setState({
      clicked: true
    })
  }

//修改章节名
  _onChange(key) {
    chapterDatas[key].chapterName = this.refs['cNameValue' + key].value;

    this.setState({
      nameChange: true
    });
  }

//修改副本文件名
_subChange(arr,k,key){
  arr[k].subName = this.refs['sNameValue' + k + key].value;

  this.setState({
    subNameChange: true
  });
}

//修改子章节名
_childChange(arr,kk,key){
  arr[kk].childName = this.refs['cdNameValue'+ kk + key].value;

  this.setState({
    childNameChange: true
  });
}
//修改副本子章节名
_subchildChange(arr,kkk,k,key){
  arr[kkk].subchildName = this.refs['scdNameValue'+kkk + k + key].value;

  this.setState({
    subchildNameChange: true
  });
}

  render() {

    return (
      <div>
        <div className="chaps" ref="chaps">
          <Button
            className="newchap"
            onClick = {
             this._add.bind(this)
            }
          >
            +
          </Button>
          {
            chapterDatas.map((data)=>{
              let key = chapterDatas.indexOf(data);
              let index = data.chapterIndex;
              let bre = data.chapterBre;
              let name = data.chapterName;
              let child = data.childChap;
              //let subDatas = chapterDatas[key].chapterBre;

              return(
                <div className="sumchap"  key={key}>
                  <div className='chap' ref={'chap'+key}>
                    <span>Chapter{index}: </span>
                    <span>{name}</span>
                    <div>{'章节简介：'+chapterDatas[key].chapterSum}</div>
                    <Button amSize="xs" className="setting">编辑</Button>
                    <span className="editChapP">
                        <Button  amSize="xs" onClick={()=>{this._delete(data)}}>删除</Button>
                        <Button  amSize="xs"  ref={'bc'+key} onClick={()=>{this._createBre(data)}}>创建副本</Button>
                        <Button  amSize="xs"  ref={'cd'+key} onClick={()=>{this._createChild(data)}}>创建子章节</Button>
                        <input
                        ref={'cNameValue'+key}
                        type="text"
                        onChange={()=>{this._onChange(key)}}
                        />
                    </span>
                  </div>
                  <div>
                  {
                    child.map((data)=>{
                      let kk = child.indexOf(data);
                      let childin = data.childIndex;
                      let childname = data.childName;

                      return(
                        <div key={kk} className='childrenBlock'>
                          <div className='childblock'>
                            <span>{index+'-'+childin}：{childname}</span>
                            <Button  amSize="xs" onClick={()=>{this._deletechild(child,data)}}>删除</Button>
                            <input
                            ref={'cdNameValue'+kk+key}
                            type="text"
                            onChange={()=>{this._childChange(child,kk,key)}}
                            />
                          </div>
                        </div>
                      )
                    })
                  }
                  {
                    bre.map((data)=>{
                      let k = bre.indexOf(data);
                      //let subindex = data.subIndex;
                      let subname = data.subName;
                      let brechild = data.subchildChap;

                      return(
                        <div   key={k}>
                          <div className='subchap' ref={'subchap'+k} onClick={this._onClick.bind(this)}>
                            <span>Chapter{index+'副本'}: </span>
                            <span>{subname}</span>
                            <div>{'章节简介：'+bre[k].subSum}</div>
                            <Button amSize="xs" className="setting">编辑</Button>
                            <span className="editChapP">
                                <Button  amSize="xs" onClick={()=>{this._deleteBre(bre,data)}}>删除</Button>
                                <Button  amSize="xs"  ref={'scd'+key} onClick={()=>{this._createsubChild(data)}}>创建子章节</Button>
                                <input
                                ref={'sNameValue'+k+key}
                                type="text"
                                onChange={()=>{this._subChange(bre,k,key)}}
                                />
                            </span>
                          </div>
                          {
                            brechild.map((data)=>{
                              let kkk = brechild.indexOf(data);
                              let childin = data.subchildIndex;
                              let childname = data.subchildName;

                              return(
                                <div key={kkk} className='childrenBlock'>
                                  <div className='childblock'>
                                    <span>{index+'副本'+'-'+childin}：{childname}</span>
                                    <Button  amSize="xs" onClick={()=>{this._deletechild(brechild,data)}}>删除</Button>
                                    <input
                                    ref={'scdNameValue'+kkk+k+key}
                                    type="text"
                                    onChange={()=>{this._subchildChange(brechild,kkk,k,key)}}
                                    />
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      );
                    })
                  }
                  </div>
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
