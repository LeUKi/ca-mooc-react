import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './admin.scss'

function Admin({ match }) {
  return <div className="Admin" >
    我是admin bar
<Router>
      <Switch>
        <Route path={match.url + "/communication"} component></Route>
        <Route path={match.url + "/home"} component></Route>
        <Route path={match.url + "/query"} component></Route>
        <Route path={match.url}>
          <Redirect to={match.url + '/home'}></Redirect>
        </Route>
      </Switch>
    </Router>
  </div>
}

export default Admin;