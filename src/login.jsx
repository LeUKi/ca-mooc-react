import React from 'react';
import './login.scss'
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';
import axios from 'axios'


class Login extends React.Component {
  componentDidMount() {
    document.title="后台登入"
    if (!(sessionStorage.token === undefined)) {
      this.props.history.push('/admin')
    }
  }
  that = this;
  onFinish = values => {
    axios({
      method: 'post',
      url: `http://118.178.125.139:8060/adminLogin?password=${values.password}&username=${values.username}`,
      headers: { 'Content-Type': 'application/json', }
    }).then((response) => {
      sessionStorage.token = response.data.extended.token;
      this.props.history.push('/admin')
      message.success('登入成功');
    }).catch(function (error) {
      message.error(error);
    });
  };

  render() {
    return (

      < div className="Login noselect" >
        <Card className={'bread'}>
          <div className={'title'}> <span>后台登入</span>
            <Button size={"small"} icon={<HomeOutlined />} onClick={() => {
              this.props.history.push('/')
            }}>

            </Button>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登入
        </Button>
            </Form.Item>
          </Form>
        </Card>
      </div >
    )
  }
}


export default Login;