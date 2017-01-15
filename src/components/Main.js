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
  client.putObjectFromString(bucket, key, 'hello world')
    .then(response => console.log(response))    // 成功
    .catch(error => console.error(error));
    */

//拿到储存章节信息的json文件，转化为数组

let chapterDatas = [
  {
    chapterIndex:1,
    chapterName:'哈哈哈'
  }
];

//单个章节节点组件
class ChapIndexs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
              add: false,
              delete: false,
              chapName: '点击修改章节名'
            };
  }
  //点击为chapterDatas数组添加新的一组章节数据项
    _add(e){
      chapterDatas.push({
        chapterIndex:chapterDatas.length + 1,
        chapterName:''
      });


      console.log(chapterDatas[chapterDatas.length-1]);
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

    //_nameChange

  render() {

    return (
      <div>
        {
          chapterDatas.map((name)=>{
            let key = chapterDatas.indexOf(name);
            return(
              <div className='chap'  key={key}>

                <span>Chapter{key+1} :</span>

                <span>{chapterDatas[key].chapterName}</span>

                <input type="button" value="编辑"/>

                <input
                type="button"
                value="删除"
                onClick={()=>{this._delete(name)}}
                />


                <input
                type="text"
                value={chapterDatas[key].chapterName}
                />

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
