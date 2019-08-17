import React from 'react'
import { HashRouter, Route, Link } from "react-router-dom"

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <Link to='/main'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/topics'>Topics</Link>
            </li>
          </ul>

          <hr/>
          {/*接收子组件之后 当成children放进来？*/}
          {this.props.children}


        </div>
      </div>
    )
  }
}

export default Home

