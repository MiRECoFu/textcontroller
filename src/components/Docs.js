import { Link } from 'react-router'
let Storage = require('../storage/storage.js');

class Docs extends React.Component {
  constructor(props) {
    super(props);

    // 只在初次运行时加载预设数据，即localStorage相应key为空时
    if(!Storage.get('myDocs')){
      let myDocs = [];
      let presetDatas = require('../data/docData.json');
      for(let i in presetDatas){
        if(!presetDatas[i].deleted){
          myDocs.push(presetDatas[i]);
        }
      }
      Storage.set('myDocs', myDocs);
    }
  }

  //新建
  _newItem() {
    let date = new Date();
    let time = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate();
    time += date.getTime().toString().substr(11);
    let newDoc = {
      total: 0,
      title: "未命名",
      id: time.substr(4),
      data: []
    };
    let myDocs = Storage.get('myDocs') || [];
    myDocs.push(newDoc);
    this.setState({
      docsCount: myDocs.length
    });
    Storage.set('myDocs', myDocs);
  }

  render(){
    let myDocs = Storage.get('myDocs') || [];
    return (
      <div>
        <button
          className="new-doc"
          onClick={()=>{this._newItem()}}
        >新建</button>
        <div>
          {
            myDocs.map(function(data){
              let docUrl = "/studio/docs/" + data.id;
              return (<Link to={docUrl} key={data.id} className="doc-item">{data.title || "未命名"}</Link>);
            })
          }
        </div>
      </div>
    )
  }

}

export default Docs;
