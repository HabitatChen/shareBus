import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import App from './App'
import Login from './page/login'
import Admin from './admin'
import Button from './page/ui/button'
import NoMatch from './page/no-match'

export default class IRouter extends React.Component {
  render() {
    return (

      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/admin' render={() =>
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Button}/>
                  <Route component={NoMatch} />
                </Switch>

              </Admin>
            }/>
            <Route path='/order/detail' component={Login}/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

//