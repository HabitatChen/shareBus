import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import App from "./App"
import Login from './page/login'
import Buttons from './page/ui/button'
import Modal from './page/ui/modal'
import Admin from './admin'
import NoMatch from './page/no-match'

class Route extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/admin' render={() =>
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Buttons} />
                  <Route path='/admin/ui/modals' component={Modal} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}