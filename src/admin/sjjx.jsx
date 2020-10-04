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
    LinkOutlined,
    QuestionCircleOutlined
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

    }
    componentWillMount() {
        this.getDt()
    }
    getDt = () => {
        axios.get('http://118.178.125.139:8060/guest/practicalTeach/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.PracticalTeachs.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        pid: GG.pid,
                        practicalTeach_title: GG.practicalTeach_title,
                        practicalTeach_url: (
                            <Tooltip title={GG.practicalTeach_url}>
                                <Button type={"link"}
                                    icon={<LinkOutlined />}
                                    href={GG.practicalTeach_url} />
                            </Tooltip>),
                        practicalTeach_destination: GG.practicalTeach_destination,
                        practicalTeach_time: GG.practicalTeach_time,
                        Actions: (<div>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(GG.pid)}>
                                编辑
                            </Button>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.pid)}
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
            axios.post('http://118.178.125.139:8060/admin/practicalTeach/add',
                qs.stringify({
                    'practicalTeach_title': this.state.value_1,
                    'practicalTeach_destination': this.state.value_2,
                    'practicalTeach_url': this.state.value_4,
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
            this.state.value_1 = this.state.getData.find(i => i.pid === id).practicalTeach_title;
            this.state.value_2 = this.state.getData.find(i => i.pid === id).practicalTeach_destination;
            this.state.value_3 = id;
            this.state.value_4 = this.state.getData.find(i => i.pid === id).practicalTeach_url;
            this.setState({
                Editvisible: true
            })
        } else {

            axios.post('http://118.178.125.139:8060/admin/practicalTeach/update',
                qs.stringify({
                    'practicalTeach_title': this.state.value_1,
                    'practicalTeach_destination': this.state.value_2,
                    'practicalTeach_url': this.state.value_4,
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
        axios.delete('http://118.178.125.139:8060/admin/practicalTeach/deleteById?id=' + id,
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
                dataIndex: 'pid',

            },
            {
                title: '实践教学主题',
                dataIndex: 'practicalTeach_title',

            },
            {
                title: '实践教学内容',
                dataIndex: 'practicalTeach_destination',

            },
            {
                title: '实践教学地址',
                dataIndex: 'practicalTeach_url',
            },
            {
                title: '实践教学时间',
                dataIndex: 'practicalTeach_time',

            }, {
                title: '操作',
                dataIndex: 'Actions',

            },
        ];
        return (<>
            <Button
                onClick={this.New}
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right", marginBottom: '10px' }}>
                新建
                </Button><h2>实践教学信息管理</h2>
            <Table
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                title="新建实践教学"
                visible={this.state.Newvisible}
                okText='确认新建'
                cancelText='取消'
                onOk={this.New}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    placeholder='实践教学主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    placeholder='实践教学内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_4 = value }}
                    placeholder='实践教学地址...'
                    autoSize>
                </TextArea>
            </Modal>

            <Modal
                destroyOnClose
                title="修改实践教学"
                visible={this.state.Editvisible}
                okText='确认修改'
                cancelText='取消'
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    defaultValue={this.state.value_1}
                    placeholder='实践教学主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    defaultValue={this.state.value_2}
                    placeholder='实践教学内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_4 = value }}
                    defaultValue={this.state.value_4}
                    placeholder='实践教学地址...'
                    autoSize>
                </TextArea>
            </Modal>
        </>)
    }
}

export default App;