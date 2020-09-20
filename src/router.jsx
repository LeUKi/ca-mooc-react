import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Guest from './guest/guest'
import Login from './login'
import Admin from './admin/admin'



export default function Rtr() {
    return <Router>
        <Switch>
            <Route path='/guest' component={Guest}></Route>
            <Route path='/admin' component={Admin}></Route>
            <Route path='/login' component={Login}></Route>
            <Route exact path='*'>
                <Redirect to='/guest'></Redirect>
            </Route>
        </Switch>
    </Router >
}