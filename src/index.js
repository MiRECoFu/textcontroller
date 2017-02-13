import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute} from 'react-router'
import { browserHistory } from 'react-router';

import Doc from './components/DocEditor';
import Studio from './components/Studio';

// Render the main component into the dom
// ReactDOM.render(<Room />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="studio">
      <IndexRoute component={Studio}/>
      <Route path='docs/:docId' component={Doc} />
    </Route>
  </Router>
), document.getElementById('app'))
