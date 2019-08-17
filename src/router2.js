import React from 'react'
import { HashRouter, Switch, Route} from "react-router-dom"
import App from './App'
import Login from './page/login'
import Admin from './admin'
import Buttons from './page/ui/button'
import NoMatch from './page/no-match'

class IRouters extends React.Component {
  render() {
    return (
      <HashRouter>
        {/*使用一个组件包裹，使得可以多个不同的页面跳转*/}
        <App>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/admin' render={() =>
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Buttons} />
                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>


      </HashRouter>
    )
  }
}
export default IRouters