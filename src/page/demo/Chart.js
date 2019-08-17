import React from 'react'

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component did mount');
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('will receive props' + nextProps.name);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('should update')
    return true
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('will update');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('did update');
  }

  render() {
    return(
      <div>
        {this.props.name}
      </div>
    )
  }

}