require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import {BosClient} from 'bce-sdk-js';

import AMUIReact from 'amazeui-react';
var Button = AMUIReact.Button;
var Icon = AMUIReact.Icon;

const config = {
  endpoint: 'http://gz.bcebos.com',         //传入Bucket所在区域域名
  credentials: {
      ak: '6bb013b74f43441aa2961130a550837d',         //您的AccessKey
      sk: '114576782dd448b89c8e4b2b2db551be'       //您的SecretAccessKey
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

let chapterDatas = require('../data/chapData.json');

//单个章节节点组件
class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
              add: false,
              delete: false,
              nameChange: false
            };
  }
  //点击为chapterDatas数组添加新的一组章节数据项
    _add(e){
      chapterDatas.push({
        chapterIndex:chapterDatas.length + 1,
        chapterName:''
      });


      console.log(chapterDatas[chapterDatas.length-1]);
      //取出每个章节信息的index
      let chapi = [];
      chapterDatas.forEach(function(v){chapi.push(v.chapterIndex)});
      console.log(chapi[chapi.length-1]);

      this.setState({
        add: true
      })

      e.stopPropagation();
      e.preventDefault();
    }


  //点击删除某一章节节点信息
    _delete(index){
          chapterDatas.splice(chapterDatas.indexOf(index),1);
          this.setState({
            delete: true
          })
        }

    _onChange(e){
      //取出每个章节信息的Name
      //let chapN = [];
      //chapterDatas.forEach(function(v){chapN.push(v.chapterName)});

      chapterDatas[this.refs.cNameValue.name].chapterName = this.refs.cNameValue.value;

      console.log(chapterDatas[this.refs.cNameValue.name].chapterName);

      this.setState({
        nameChange: true
      });
      e.stopPropagation();
      e.preventDefault();
    }

  render() {

    return (
      <div>
        {
          chapterDatas.map((name)=>{
            let key = chapterDatas.indexOf(name);
            return(
              <div className='chap'  key={key}>
              
                <Button>
                  <Icon icon="cog" /> 设置
                </Button>

                <Button amStyle="warning">
                  <Icon icon="shopping-cart" /> 败家
                </Button>

                <Button>
                  <Icon icon="spinner" spin /> Loading
                </Button>
                <div>
                    <p><Icon icon="qq" /> QQ</p>
                    <p><Icon icon="weixin" /> Wechat</p>
                </div>

                <span>Chapter{key+1} :</span>
                <span>{chapterDatas[key].chapterName}</span>
                <div>{'章节简介：'+chapterDatas[key].chapterSum}</div>

                <input type="button" value="编辑"/>

                <div className="editChapP">


                      <input
                      type="button"
                      value="删除"
                      onClick={()=>{this._delete(name)}}
                      />


                      <input
                      ref="cNameValue"
                      type="text"
                      name={key}
                      onChange={this._onChange.bind(this)}
                      />

              </div>
              </div>
            );
          })
        }
        <input  className="newchap"
                type="button"
                value="+"
                onClick={this._add.bind(this)}
              />
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

AppComponent.defaultProps = {
};

export default AppComponent;
