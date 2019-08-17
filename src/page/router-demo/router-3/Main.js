import React from 'react'
import { Link} from "react-router-dom"

export default class Main extends React.Component {
  render() {
    return (
      <div>
        this is main
        <br/>
        <Link to='/main/test-id'> to a </Link>
        <br/>
        <Link to='/main/456'> to b </Link>
        <hr/>
        {this.props.children}
      </div>
    )
  }
}