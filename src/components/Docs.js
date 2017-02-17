import { Link } from 'react-router'
let Storage = require('../storage/storage.js');

class Docs extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let myDocs = Storage.get('myDocs') || [];
    return (
      <div>
        {
          myDocs.map(function(data){
            let docUrl = "/studio/docs/" + data.id;
            return (<Link to={docUrl} key={data.id} className="doc-item">{data.title || "未命名"}</Link>);
          })
        }
      </div>
    )
  }

}

export default Docs;
