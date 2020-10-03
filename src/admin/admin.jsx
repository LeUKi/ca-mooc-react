import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import './admin.scss'
import { Menu, Layout, Button, message, Tooltip, Affix } from 'antd';
import {
  PlaySquareOutlined,
  CheckSquareOutlined,
  AudioOutlined,
  TeamOutlined,
  CommentOutlined,
  HomeOutlined,
  BookOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import Home from './home'
import Zxcp from './zxcp'
import Wlk from './wlk'
import Jz from './jz'
import Kc from './kc'
import Sjjx from './sjjx'
// import Hdjl from './hdjl'

const { Header, Content, Footer, Sider } = Layout;


class Admin extends React.Component {
  componentDidMount() {
    if (sessionStorage.token === undefined) {
      this.props.history.push('/login')
    }
  }
  clearToken = () => {
    sessionStorage.clear()
    this.props.history.push('/');
    message.success('登出成功');

  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Affix offsetTop={0}>
          <Sider
            className={'noselect'}
            breakpoint="sm"
            collapsedWidth="0"
            style={{ minHeight: '100vh' }}
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeOutlined />}><Link to={'/admin/home'}>简介/公告</Link></Menu.Item>
              <Menu.Item key="2" icon={<PlaySquareOutlined />}><Link to={'/admin/wlk'}>网络课</Link></Menu.Item>
              <Menu.Item key="3" icon={<CheckSquareOutlined />}><Link to={'/admin/zxcp'}>在线测评</Link></Menu.Item>
              <Menu.Item key="4" icon={<BookOutlined />}><Link to={'/admin/kc'}>课 程</Link></Menu.Item>
              <Menu.Item key="5" icon={<AudioOutlined />}><Link to={'/admin/jz'}>讲 座</Link></Menu.Item>
              <Menu.Item key="6" icon={<TeamOutlined />}><Link to={'/admin/sjjx'}>实践教学</Link></Menu.Item>
              <Menu.Item key="7" icon={<CommentOutlined />}><Link to={'/admin/hdjl'}>互动交流</Link></Menu.Item>
            </Menu>
          </Sider>
        </Affix>
        <Layout>
          <Affix offsetTop={0}>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
              <span className={'headerButton'}>
                <Tooltip title="保留登入状态直到关闭窗口" color={'blue'}>
                  <Button onClick={() => { this.props.history.push('/') }} className={'home'} size={'small'} icon={<HomeOutlined />}>回首页</Button>
                </Tooltip>
                <Button danger onClick={this.clearToken} className={'logout'} size={'small'} icon={<LogoutOutlined />}>登出</Button>
              </span>
              <span className={'header noselect'}>
                管理后台
            </span>
            </Header>
          </Affix>
          <Content style={{ margin: '16px 16px 0', height: '100%' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '100%' }}>
              <Router>
                <Switch>
                  {/* <Route path={"/admin/hdjl"} component={Hdjl}></Route> */}
                  <Route path={"/admin/home"} component={Home}></Route>
                  <Route path={"/admin/Jz"} component={Jz}></Route>
                  <Route path={"/admin/wlk"} component={Wlk}></Route>
                  <Route path={"/admin/sjjx"} component={Sjjx}></Route>
                  <Route path={"/admin/zxcp"} component={Zxcp}></Route>
                  <Route path={"/admin/kc"} component={Kc}></Route>
                  <Route path={'/admin'}>
                    <Redirect to={'/admin/home'}></Redirect>
                  </Route>
                </Switch>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 电路分析精品课程管理后台</Footer>
        </Layout>
      </Layout>



    );
  }
}

export default Admin;
