import React from 'react'
import { HashRouter, Route, Link } from "react-router-dom"
import About from "./About"
import Main from "./Main"
import Topics from "./Topics"

class Home extends React.Component {
  render() {
    return (
      <div>
        {/* 放在一个容器下面 */}
        <HashRouter>
          {/* 只能有一个子节点 */}
          <div>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/topics'>Topics</Link>
              </li>
            </ul>

            <hr/>

            <Route path='/' exact component={Main} />
            <Route path='/about' exact component={About} />
            <Route path='/topics' exact component={Topics} />
          </div>
        </HashRouter>
      </div>
    )
  }
}

export default Home
/*
*  目前是在同一个组件中编写路由的跳转以及匹配组件
*  1.路由的匹配必须放在一个 HashRouter 或者一个 BrowserRouter 中，然后里面只有一个根节点
*  2. <Route path='对应的节点' exact(精准匹配) component={对应的组件}
*  3. 其他页面可以通过引入 <Link to='/' > 点击之后 url 会发生变化 router 监听到url的变化，然后去匹配到
* 相应的组件
*
*  但是这样也存在一个问题 就是混合起来 感觉不严谨 要把路由抽离出来
* */
