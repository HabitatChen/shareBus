import React from 'react'
import { HashRouter as Router, Route, Link} from "react-router-dom"
import Main from "./Main"
import About from "./About"
import Topics from "./Topics"
import Home from './Home'

export default class IRoute extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Route path='/main' render={() =>
            (
              <Main>
                this is sub child
                <div>
                  <Route path='/main/a' exact component={About} />
                  <Route path='/main/b' exact component={Topics} />
                </div>
              </Main>
            )
          } />
          <Route path='/about' exact component={About} />
          <Route path='/topics' exact component={Topics} />
        </Home>
      </Router>
    )
  }
}