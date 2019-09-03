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
import Gallery from './page/ui/gallery'
import Carousels from './page/ui/carousel'
import Forms from './page/form/login'
import SignUp from './page/form/sinUp'
import NoMatch from './page/no-match'
import BasicTable from "./page/table/basicTable"
import HighTable from "./page/table/highTable"
import OpenCity from "./page/city"
import Order from "./page/order"
import Common from "./common"
import OrderDetail from './page/order/detail'
import User from './page/user'
import BikeMap from "./page/map/bikeMap"
import Bar from "./page/echarts/bar"
import Pie from "./page/echarts/pie"
import Line from "./page/echarts/line"
import Permission from "./page/permission"
import Rich from "./page/rich"

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
                  <Route path='/admin/ui/gallery' component={Gallery}/>
                  <Route path='/admin/ui/carousel' component={Carousels}/>
                  <Route path='/admin/form/login' component={Forms}/>
                  <Route path='/admin/form/reg' component={SignUp}/>
                  <Route path='/admin/table/basic' component={BasicTable}/>
                  <Route path='/admin/table/high' component={HighTable}/>
                  <Route path='/admin/city' component={OpenCity}/>
                  <Route path='/admin/order' component={Order}/>
                  <Route path='/admin/user' component={User}/>
                  <Route path='/admin/bikeMap' component={BikeMap}/>
                  <Route path='/admin/echarts/bar' component={Bar}/>
                  <Route path='/admin/echarts/pie' component={Pie}/>
                  <Route path='/admin/echarts/line' component={Line}/>
                  <Route path='/admin/permission' component={Permission}/>
                  {/* <Route path='/admin/rich' component={Rich}/> */}
                  <Route component={NoMatch} />
                </Switch>

              </Admin>
            }/>
            <Route path='/common' render={() => {
              return (
                <Common>
                  <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                </Common>
              )
            }} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

//