import React from "react";
import menuConfig from '../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less'

const { SubMenu } = Menu;

export default class NavLeft extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      menuTreeNode: ''
    }
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(menuConfig)
    this.setState({
      menuTreeNode
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

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc Ms</h1>
          <Menu theme='dark'>
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </div>
    )
  }
}