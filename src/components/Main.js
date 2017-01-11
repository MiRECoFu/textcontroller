require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
//let yeomanImage = require('../images/yeoman.png');

//单个章节节点组件
class ChapIndexs extends React.Component {
  render() {

    //设置此组件大小
  //  let chapClassName = 'chap-name';

    return (
      <div className="chap" ref="chap">

      </div>
    );
  }
}



class AppComponent extends React.Component {
  render() {

    let chapIndex = [];

    chapIndex.push(<ChapIndexs key=""/>);

    return (
      <section className="workplace" ref="workplace">
        <section className="controllnav">

              <section className="chaps" ref="chaps">
                {chapIndex}
                <button className="newchap" ref="newchap"> + </button>
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
