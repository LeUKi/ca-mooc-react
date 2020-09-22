import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './guest.scss'

import Communication from './communication'
import Home from './home'
import Query from './query'


import 'antd/dist/antd.css'



function Guest({ match }) {
  return <div className="Guest" >
    <div className='banner'>
      <div className='text'>
        <span className='text1'>电路分析</span>
        <span className='text2'>精品课程</span>
      </div>
    </div>

<ul>
  <li></li>
</ul>


    <Router>
      <Switch>
        <Route path={match.url + "/communication"} component={Communication}></Route>
        <Route path={match.url + "/home"} component={Home}></Route>
        <Route path={match.url + "/query"} component={Query}></Route>
        <Route path={match.url}>
          <Redirect to={match.url + '/home'}></Redirect>
        </Route>
      </Switch>
    </Router>
  </div>
}

export default Guest;