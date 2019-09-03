import React from "react";
import menuConfig from '../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from "../../redux/action"
import './index.less'

const { SubMenu } = Menu;

class NavLeft extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuTreeNode: '',
      currentKey: ''
    }
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(menuConfig)
    let currentKey = window.location.hash.replace('#', '')
    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  // 菜单渲染 递归
  renderMenu = (data) => {
    return (
      data.map((item) => {
        if (item.children) {
          return (
            <SubMenu title={item.title} key={item.key}>
              {this.renderMenu(item.children)}
            </SubMenu>
          )
        }
        return  (
          <Menu.Item title={item.title} key={item.key}>
            <NavLink to={item.key}>
              {item.title}
            </NavLink>
          </Menu.Item>
          )
      })
    )
  }

  handleClick = (item) => {
    console.log(item)
    console.log(item.item.props.title)
    const { dispatch } = this.props
    dispatch(switchMenu(item.item.props.title))
    this.setState({
      currentKey: item.key
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc Ms</h1>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.currentKey]}
            theme='dark'
          >
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </div>
    )
  }
}

const mapStateToPros = {

}

export default connect()(NavLeft)
