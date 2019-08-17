import React from 'react'
import { Link} from "react-router-dom"

export default class Main extends React.Component {
  render() {
    return (
      <div>
        this is main
        <Link to='/main/a'> to a </Link>
        <Link to='/main/b'> to b </Link>
        <hr/>
        {this.props.children}
      </div>
    )
  }
}