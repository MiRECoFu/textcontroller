import { Link } from 'react-router'
let Storage = require('../storage/storage.js');

class Trash extends React.Component {
  constructor(props) {
    super(props);
    if(!Storage.get('deletedDocs')){
      let deletedDocs = [];
      let presetDatas = require('../data/docData.json');
      for(let i in presetDatas){
        if(presetDatas[i].deleted){
          deletedDocs.push(presetDatas[i]);
        }
      }
      Storage.set('deletedDocs', deletedDocs);
    }
  }

  render(){
    let deletedDocs = Storage.get('deletedDocs') || [];
    return (
      <div>
        {
          deletedDocs.map(function(data){
            let docUrl = "/studio/docs/" + data.id;
            return (<Link to={docUrl} key={data.id} className="doc-item">{data.title || "未命名"}</Link>);
          })
        }
      </div>
    )
  }

}

export default Trash;
