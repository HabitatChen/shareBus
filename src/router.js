import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import App from './App'
import Login from './page/login'
import Admin from './admin'
import Button from './page/ui/button'
import Modal from './page/ui/modal'
import Loadings from './page/ui/loading'
import Notice from './page/ui/notice'
import Messages from './page/ui/message'
import Tab from './page/ui/tabs'
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
                  <Route path='/admin/ui/modals' component={Modal}/>
                  <Route path='/admin/ui/loadings' component={Loadings}/>
                  <Route path='/admin/ui/notification' component={Notice}/>
                  <Route path='/admin/ui/messages' component={Messages}/>
                  <Route path='/admin/ui/tabs' component={Tab}/>
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