/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Button, Modal, Input, message, Popconfirm, Upload } from 'antd';
import axios from 'axios'
import qs from 'qs'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    UploadOutlined
} from '@ant-design/icons';
const { TextArea } = Input;


class App extends React.Component {
    state = {
        getData: [],
        Newvisible: false,
        Editvisible: false,
        value_1: '',
        value_2: '',
        value_3: '',
        value_4: '',
        uploading: false,

    }
    componentWillMount() {
        this.getDt()
    }
    getDt = () => {
        axios.get('http://118.178.125.139:8060/guest/onlineTest/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.OnlineTests.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        oid: GG.oid,
                        onlineTest_title: GG.onlineTest_title,
                        onlineTest_url: GG.onlineTest_url,
                        onlineTest_destination: GG.onlineTest_destination,
                        onlineTest_time: GG.onlineTest_time,
                        Actions: (<div>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(GG.oid)}>
                                编辑
                            </Button>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.oid)}
                                arrowPointAtCenter
                                icon={<QuestionCircleOutlined
                                    style={{ color: 'red' }} />}>
                                <Button
                                    type='danger'
                                    icon={<DeleteOutlined />}
                                    size='small'>
                                    删除
                            </Button>
                            </Popconfirm>
                        </div>)
                    })
                })
                this.setState({
                    getData: GGafter
                });
            }
        )
    }
    New = () => {
        if (this.state.Newvisible === false) {
            this.setState({
                Newvisible: true
            })
        } else {
            axios.post('http://118.178.125.139:8060/admin/onlineTest/add',
                qs.stringify({
                    'onlineTest_title': this.state.value_1,
                    'onlineTest_destination': this.state.value_2,
                    'onlineTest_url': this.state.value_4,
                }),
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "token": sessionStorage.token
                    }
                }).then(res => {
                    this.handleCancel()
                    message.success('成功添加')
                    this.getDt()
                })
        }
    }
    Edit = (id) => {
        if (this.state.Editvisible === false) {
            this.state.value_1 = this.state.getData.find(i => i.oid === id).onlineTest_title;
            this.state.value_2 = this.state.getData.find(i => i.oid === id).onlineTest_destination;
            this.state.value_3 = id;
            this.state.value_4 = this.state.getData.find(i => i.oid === id).onlineTest_url;
            this.setState({
                Editvisible: true
            })
        } else {

            axios.post('http://118.178.125.139:8060/admin/onlineTest/update',
                qs.stringify({
                    'onlineTest_title': this.state.value_1,
                    'onlineTest_destination': this.state.value_2,
                    // 'onlineTest_url': this.state.value_4,
                    'id': this.state.value_3
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': sessionStorage.token
                    }
                }).then(res => {
                    this.handleCancel()
                    message.success('修改成功')
                    this.getDt()
                })
        }
    }
    Del = (id) => {
        axios.delete('http://118.178.125.139:8060/admin/onlineTest/deleteById?id=' + id,
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "token": sessionStorage.token
                }
            }).then(res => {
                message.success('成功删除')
                this.getDt()
            })
    }

    handleCancel = () => {
        this.setState({
            Newvisible: false,
            Editvisible: false,
            value_1: '',
            value_2: '',
            value_3: '',
            value_4: '',
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'oid',
                width: 1
            },
            {
                title: '在线测评主题',
                dataIndex: 'onlineTest_title',
                width: '13%'
            },
            {
                title: '在线测评内容',
                dataIndex: 'onlineTest_destination',
                width: '40%'
            },
            {
                title: '在线测评地址',
                dataIndex: 'onlineTest_url',
                width: '20%'
            },
            {
                title: '在线测评时间',
                dataIndex: 'onlineTest_time',
                width: '15%'
            }, {
                title: '操作',
                dataIndex: 'Actions',
                width: 1
            },
        ];
        return (<>
            <Button
                onClick={this.New}
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right", marginBottom: '10px' }}>
                新建
                </Button><h2>修改在线测评信息</h2>
            <Table
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                title="新建在线测评"
                visible={this.state.Newvisible}
                okText='选择文件并新建'
                cancelText='取消'
                onOk={this.New}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    placeholder='在线测评主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    placeholder='在线测评内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <Upload >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Modal>

            <Modal
                destroyOnClose
                title="修改在线测评"
                visible={this.state.Editvisible}
                okText='确认修改'
                cancelText='取消'
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    defaultValue={this.state.value_1}
                    placeholder='在线测评主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    defaultValue={this.state.value_2}
                    placeholder='在线测评内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_4 = value }}
                    defaultValue={this.state.value_4}
                    placeholder='在线测评地址...'
                    autoSize>
                </TextArea>
            </Modal>
        </>)
    }
}

export default App;