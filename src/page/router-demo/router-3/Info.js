import React from 'react'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        this is Info
        id-is:
        {this.props.match.params.value}
      </div>
    )
  }
}