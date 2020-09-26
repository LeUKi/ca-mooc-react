import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import './guest.scss'

import Communication from './communication'
import Home from './home'
import Query from './query'

import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css'

import { Button, Menu, Tooltip } from 'antd';
import {
  PlaySquareOutlined,
  CheckSquareOutlined,
  AudioOutlined,
  TeamOutlined,
  CommentOutlined,
  HomeOutlined,

} from '@ant-design/icons';
//import locale from 'antd/lib/date-picker/locale/en_US';

const history = createBrowserHistory()

class Sider extends React.Component {
  state = {
    theme: 'dark',
    current: '1',
  };
  componentDidUpdate() {
    console.log(123);
  }

  logInOut = () => {
    if (sessionStorage.token === undefined) {
      return (
        <Button
          size='small'
          ghost
          style={{ float: 'right', margin: '10px' }}
        ><Link to={'/login'}>后台登入</Link></Button>)
    } else {
      return (
        <Tooltip title="您已登入" placement={'bottomRight'} color={'green'}>
          <Button
            size='small'
            ghost
            style={{ float: 'right', margin: '10px' }}
          ><Link to={'/admin'}>去后台</Link></Button></Tooltip>)
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className={'noselect'}>
        <Menu
          style={{ backgroundColor: '#18324d' }}
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <this.logInOut />
          <Menu.Item key="1" icon={<HomeOutlined />}><Link to={'/guest/home'}>首 页</Link></Menu.Item>
          <Menu.Item key="2" icon={<PlaySquareOutlined />}><Link to={'/guest/wlk'}>网络课</Link></Menu.Item>
          <Menu.Item key="3" icon={<CheckSquareOutlined />}><Link to={'/guest/zxpc'}>在线测评</Link></Menu.Item>
          <Menu.Item key="4" icon={<AudioOutlined />}><Link to={'/guest/jz'}>讲 座</Link></Menu.Item>
          <Menu.Item key="5" icon={<TeamOutlined />}><Link to={'/guest/sjjx'}>实践教学</Link></Menu.Item>
          <Menu.Item key="6" icon={<CommentOutlined />}><Link to={'/guest/hdjl'}>互动交流</Link></Menu.Item>





        </Menu>

      </div>
    );
  }
}

class Guest extends React.Component {
  render() {
    return <div className="Guest" >
      <div className='banner noselect'>
        <div className='text'>
          <span className='text1'>电路分析</span>
          <span className='text2'>精品课程</span>
        </div>
      </div>

      <Sider />

      <Router history={history}>
        <Switch>
          <Route path={"/guest/hdjl"} component={Communication}></Route>
          <Route path={"/guest/home"} component={Home}></Route>
          <Route path={"/guest/wlk"} component={Query}></Route>
          <Route path={"/guest/zxpc"} component={Query}></Route>
          <Route path={"/guest/jz"} component={Query}></Route>
          <Route path={"/guest/sjjx"} component={Query}></Route>
          <Route path={'/guest'}>
            <Redirect to={'/guest/home'}></Redirect>
          </Route>
        </Switch>
      </Router>

      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </div>

  }
}

export default Guest;