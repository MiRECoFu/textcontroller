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
<<<<<<< HEAD
      nameChange: false,
      breCont: 0
    };
  }

  //点击为chapterDatas数组添加新的一组章节数据项

=======
      nameChange: false
    };
  }

  //点击为chapterDatas数组添加新的一组章节数据项

>>>>>>> e894f4433541b9ea004be58193189f3135001e11
  _add() {
    let count = this.state.addCont;
    count++;
    this.setState({
        addCont: count,
<<<<<<< HEAD
        breCont: 0,
      })
      // console.log(count + 'add')
    chapterDatas.push({
      chapterIndex: this.state.addCont + 1,
      chapterName: chapterDatas.length + 1,
      chapterSum: '',
      chapterBre: [],
      childChap: []
=======
      })
      // console.log(count + 'add')
    chapterDatas.push({
      chapterIndex: chapterDatas.length + 1,
      chapterName: chapterDatas.length + 1
>>>>>>> e894f4433541b9ea004be58193189f3135001e11
    });

  }


  //点击删除某一章节节点信息
  _delete(obj) {
    let count = this.state.addCont;
    count--;
<<<<<<< HEAD
    //if()
=======
>>>>>>> e894f4433541b9ea004be58193189f3135001e11
    this.setState({
        addCont: count
      })
      // console.log(count + 'delete')
    chapterDatas.splice(chapterDatas.indexOf(obj), 1);
  }

  //创建副本
  _createBre(obj) {
<<<<<<< HEAD
    let subDatas = chapterDatas[chapterDatas.indexOf(obj)].chapterBre;
    let bcount = subDatas.length;
    bcount++;
    this.setState({
        breCont: bcount,
      })

      // console.log(count + 'create')
    //let proObj = chapterDatas.slice(chapterDatas.indexOf(obj), chapterDatas.indexOf(obj) + 1)
    subDatas.push({
      subIndex: this.state.breCont + 1,
      //chapterName: proObj[0].chapterName + '副本',
    });
    //console.log(chapterDatas[chapterDatas.indexOf(obj)].chapterIndex);
    // this._add()
  }

  _onClick() {
    this.setState({
      clicked: true
    })
  }

  _onChange(key) {
    //取出每个章节信息的Name

    chapterDatas[key].chapterName = this.refs['cNameValue' + key].value;

=======
    let count = this.state.addCont;
    count++;
    this.setState({
        addCont: count,
      })
      // console.log(count + 'create')
    let proObj = chapterDatas.slice(chapterDatas.indexOf(obj), chapterDatas.indexOf(obj) + 1)
    chapterDatas.splice(chapterDatas.indexOf(obj) + 1, 0, {
      chapterIndex: chapterDatas.length + 1,
      chapterName: proObj[0].chapterName + '副本',
    });

    // this._add()
  }

  _onClick() {
    this.setState({
      clicked: true
    })
  }

  _onChange(key) {
    //取出每个章节信息的Name

    chapterDatas[key].chapterName = this.refs['cNameValue' + key].value;

>>>>>>> e894f4433541b9ea004be58193189f3135001e11
    this.setState({
      nameChange: true
    });
  }

  render() {

    return (
      <div>
<<<<<<< HEAD
        <Button
=======
        <Button  
>>>>>>> e894f4433541b9ea004be58193189f3135001e11
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
<<<<<<< HEAD
            let index = data.chapterIndex;
            let bre = data.chapterBre;
            let name = data.chapterName;
            //let subDatas = chapterDatas[key].chapterBre;

            return(
              <div className="sumchap">
                <div className='chap'  key={key}>
                  <span>Chapter{index}: </span>
                  <span>{name}</span>
                  <div>{'章节简介：'+chapterDatas[key].chapterSum}</div>
                  <Button amSize="sm" className="setting">编辑</Button>
                  <div className="editChapP">
                      <Button  amSize="sm" onClick={()=>{this._delete(data)}}>删除</Button>
                      <Button  amSize="sm"  ref={'bc'+key} onClick={()=>{this._createBre(data)}}>创建副本</Button>
                      <input
                      ref={'cNameValue'+key}
                      type="text"
                      onChange={()=>{this._onChange(key)}}
                      />
                  </div>
                </div>
                <div>
                {
                  bre.map((data)=>{
                    let key = bre.indexOf(data);
                    let subindex = data.subIndex;
                    let subname = data.subName;

                    return(
                      <div className='chap'  key={key}>
                        <span>Chapter{index+'-'+subindex}: </span>
                        <span>{subname}</span>
                        <Button amSize="sm" className="setting">编辑</Button>
                        <div className="editChapP">
                            <Button  amSize="sm" onClick={()=>{this._delete(data)}}>删除</Button>
                            <input
                            ref={'cNameValue'+key}
                            type="text"
                            onChange={()=>{this._onChange(key)}}
                            />
                        </div>
                      </div>
                    );
                  })
                }
                </div>
=======
            let name = data.chapterName;
            
            return(
              <div className='chap'  key={key}>
                <span>Chapter{key+1}: </span>
                <span>{name}</span>
                <div>{'章节简介：'+chapterDatas[key].chapterSum}</div>
                <Button amSize="sm" className="setting">编辑</Button>
                <div className="editChapP">
                  <Button  amSize="sm" onClick={()=>{this._delete(data)}}>删除</Button>
                  <Button  amSize="sm" onClick={()=>{this._createBre(data)}}>创建副本</Button>
                  <input
                  ref={'cNameValue'+key}
                  type="text"
                  onChange={()=>{this._onChange(key)}}
                  />
              </div>
>>>>>>> e894f4433541b9ea004be58193189f3135001e11
              </div>
            );
          })
        }
      </div>
    );
  }
}



class AppComponent extends React.Component {

  render() {
    return (
      <section className="workplace" ref="workplace">
        <section className="controllnav">
          <section className="chaps" ref="chaps">
            <ChapIndexs/>
          </section>
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