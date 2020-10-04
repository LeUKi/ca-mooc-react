/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Button, Modal, Input, message, Popconfirm, Tooltip } from 'antd';
import axios from 'axios'
import qs from 'qs'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
const { TextArea } = Input;
const url = 'http://118.178.125.139:8060';

class App extends React.Component {
    state = {
        getData: [],
        Newvisible: false,
        Editvisible: false,
        value_1: '',
        value_2: '',
        value_3: '',
    }
    getJJ = () => {
        axios.get(url + '/guest/introduce/find',).then(
            res => {
                const JJdata = res.data.extended.Introduce;
                this.setState({
                    JJbefore: JJdata.introduce_destination,
                })
            }
        )
    }
    componentWillMount() {
        this.getDt()
        this.getJJ()
    }
    okJJ = () => {
        const data = { 'introduce_destination': this.state.JJafter, 'id': 1, 'introduce_title': ' “电路分析”课程简介', }
        axios.post(url + '/admin/introduce/update', qs.stringify(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                "token": sessionStorage.token
            }
        }).then(res => {
            this.getJJ()
            message.success('修改成功');
        })
    }
    getDt = () => {
        axios.get(url + '/guest/notice/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.notices.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        nid: GG.nid,
                        notice_title: GG.notice_title,
                        notice_destination: GG.notice_destination,
                        notice_time: GG.notice_time,
                        Actions: (<div>
                            <Tooltip title="编辑" placement={'left'} color={'blue'}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    size='small'
                                    onClick={() => this.Edit(GG.nid)} />
                            </Tooltip>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.nid)}
                                arrowPointAtCenter
                                icon={<QuestionCircleOutlined
                                    style={{ color: 'red' }} />}>
                                <Tooltip title="删除" placement={'left'} color={'red'}>
                                    <Button
                                        type='danger'
                                        icon={<DeleteOutlined />}
                                        size='small' />
                                </Tooltip>
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
            axios.post(url + '/admin/notice/add',
                qs.stringify({
                    'notice_title': this.state.value_1,
                    'notice_destination': this.state.value_2
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
            this.setState({
                value_1: this.state.getData.find(i => i.nid === id).notice_title,
                value_2: this.state.getData.find(i => i.nid === id).notice_destination,
                value_3: id
            }, () => {
                this.setState({
                    Editvisible: true
                })
            })
        } else {
            axios.post(url + '/admin/notice/update',
                qs.stringify({
                    'notice_title': this.state.value_1,
                    'notice_destination': this.state.value_2,
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
        axios.delete(url + '/admin/notice/deleteById?id=' + id,
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
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'nid',
                width: 1
            },
            {
                title: '公告标题',
                dataIndex: 'notice_title',
                align: 'center',
                width: 300
            },
            {
                title: '公告内容',
                dataIndex: 'notice_destination',
                align: 'center',

            },
            {
                title: '公告时间',
                dataIndex: 'notice_time',
                align: 'center',
                width: 118
            }, {
                title: '操作',
                dataIndex: 'Actions',
                width: 1
            },
        ];
        return (<>
            <h2>修改简介信息</h2>
            <TextArea
                defaultValue={this.state.JJbefore}
                placeholder={this.state.JJbefore}
                onChange={({ target: { value } }) => {
                    this.state.JJafter = value
                }}
                autoSize={{ minRows: 6 }} ></TextArea>
            <Button
                type="primary"
                style={{ float: "right", marginTop: '10px' }}
                onClick={this.okJJ}
            >修改</Button>
            <hr style={{ marginTop: 60, marginBottom: 20 }} />
            <Button
                onClick={this.New}
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right", marginBottom: '10px' }}>
                新建
                </Button><h2>公告信息管理</h2>
            <Table
                scroll={{ x: true }}
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                title="新建公告"
                visible={this.state.Newvisible}
                okText='确认新建'
                cancelText='取消'
                onOk={this.New}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    placeholder='公告标题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    placeholder='公告内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
            </Modal>

            <Modal
                destroyOnClose
                title="修改公告"
                visible={this.state.Editvisible}
                okText='确认修改'
                cancelText='取消'
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    defaultValue={this.state.value_1}
                    placeholder='公告标题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    defaultValue={this.state.value_2}
                    placeholder='公告内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
            </Modal>
        </>)
    }
}

export default App;