require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
//let yeomanImage = require('../images/yeoman.png');


//拿到储存章节信息的json文件，转化为数组
//let chapterDatas = require('../data/chapterData.json');

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

  let chapIndex = [];

  //  chapIndex.push(<ChapIndexs name=""/>);
  for(let i=0;i<=chapterDatas.length;i++) {
    chapIndex.push(<ChapIndexs name="" key=""/>)
  }

    return (
      <section className="workplace" ref="workplace">
        <section className="controllnav">

              <section className="chaps" ref="chaps">
                {chapIndex}
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
