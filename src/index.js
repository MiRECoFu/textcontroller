import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute} from 'react-router'
import { browserHistory } from 'react-router';

import Doc from './components/DocEditor';
import Docs from './components/Docs';
import Studio from './components/Studio';
import Trash from './components/Trash';

// Render the main component into the dom
// ReactDOM.render(<Room />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="studio" component={Studio}>
      <IndexRoute component={Docs}/>
      <Route path='docs' component={Docs} />
      <Route path='trash' component={Trash} />
    </Route>
    <Route path='studio/docs/:docId' component={Doc} />
  </Router>
), document.getElementById('app'))
