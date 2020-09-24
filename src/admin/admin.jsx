import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './admin.scss'
import { Menu, Layout, Button, message,Tooltip } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
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
        <Sider
          className={'noselect'}
          breakpoint="sm"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
           </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
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
          <Content style={{ margin: '16px 16px 0', height: '100%' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '100%' }}>
              {/* <Router>
                <Switch>
                  <Route path={"/admin/communication"} component></Route>
                  <Route path={"/admin/home"} component></Route>
                  <Route path={"/admin/query"} component></Route>
                  <Route path={'/admin'}>
                    <Redirect to={'/admin/home'}></Redirect>
                  </Route>
                </Switch>
              </Router> */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 电路分析精品课程管理后台</Footer>
        </Layout>
      </Layout >



    );
  }
}

export default Admin;
