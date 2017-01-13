require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom';
import {BosClient} from 'bce-sdk-js';

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
client.putObjectFromFile(bucket, key, __filename)
  .then(response => console.log(response))    // 成功
  .catch(error => console.error(error));      // 失败

  */

  client.putObjectFromString(bucket, key, 'hello world')
    .then(response => console.log(response))    // 成功
    .catch(error => console.error(error));

//拿到储存章节信息的json文件，转化为数组

let chapterDatas = [
  {
    'chapterIndex':1,
    'chapterName':''
  }
];

//单个章节节点组件
class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
              add: false,
              delete: false
            };
  }
  //点击为chapterDatas数组添加新的一组章节数据项
    _add(){
      chapterDatas.push({
        'chapterIndex':chapterDatas.length + 1,
        'chapterName':''
      });
      //console.log(chapterDatas.indexOf(chapterdata))
      this.setState({
        add: true
      })
    }

  render() {


    return (
      <div>
        {
          chapterDatas.map((name)=>{
            let key = chapterDatas.indexOf(name);
            return(
              <div className="chap" ref={'chap'+name} key={key}>
                <span>Chapter{key+1}</span>
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
