import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './guest.scss'

import Communication from './communication'
import Home from './home'
import Query from './query'

import {Button} from 'antd';
import 'antd/dist/antd.css'

function Guest({ match }) {
  return <div className="Guest" >
<Button>123</Button>

    我是guest Bar
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