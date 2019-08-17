import React from 'react'
import { HashRouter as Router, Route, Switch} from "react-router-dom"
import Main from "./Main"
import About from "./About"
import Topics from "./Topics"
import Home from './Home'
import Info from './Info'
import NoMatch from "./NoMatch"

export default class IRoute1 extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route path='/main' render={() =>
              (
                <Main>
                  this is sub child
                  <div>
                    <Route path='/main/:value' exact component={Info} />
                  </div>
                </Main>
              )
            } />
            <Route path='/about' exact component={About} />
            <Route path='/topics' exact component={Topics} />
            <Route component={NoMatch} />
          </Switch>
        </Home>
      </Router>
    )
  }
}