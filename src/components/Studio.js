'use strict';
require('styles/Studio.css')
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

class Studio extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <p>这是我的工作室</p>
        <Link to="/studio/docs/1" >第一篇文章</Link>
        <Link to="/studio/docs/2" >第二篇文章</Link>
      </div>
    );
  }
}

export default Studio;
