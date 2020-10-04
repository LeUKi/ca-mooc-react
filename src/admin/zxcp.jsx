/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Button, Modal, Input, message, Popconfirm, Tooltip } from 'antd';
import axios from 'axios'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FileOutlined,
    QuestionCircleOutlined,
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
        value_4: '',
        uploading: false,

    }
    file1 = React.createRef()
    componentWillMount() {
        this.getDt()
    }
    getDt = () => {
        axios.get(url + '/guest/onlineTest/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.OnlineTests.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        oid: GG.oid,
                        onlineTest_title: GG.onlineTest_title,
                        onlineTest_url: (
                            <Tooltip title={GG.onlineTest_url}>
                                <Button type={"link"}
                                    icon={<FileOutlined />}
                                    href={url + GG.onlineTest_url} />
                            </Tooltip>),
                        onlineTest_destination: GG.onlineTest_destination,
                        onlineTest_time: GG.onlineTest_time,
                        Actions: (<div>
                            <Tooltip title="编辑" placement={'left'} color={'blue'}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    size='small'
                                    onClick={() => this.Edit(GG.oid)} />
                            </Tooltip>
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
            let formData = new FormData();
            formData.append('onlineTest_title', this.state.value_1)
            formData.append('onlineTest_destination', this.state.value_2)
            formData.append('testfile',
                document.querySelector('input[type="file"]').files[0])

            axios.post(url + '/admin/onlineTest/add',
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
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
            let gogogo = new FormData();
            gogogo.append('onlineTest_title', this.state.value_1)
            gogogo.append('onlineTest_destination', this.state.value_2)
            gogogo.append('id', this.state.value_3)
            gogogo.append('testfile',
                document.querySelector('input[type="file"]').files[0])
            axios.post(url + '/admin/onlineTest/update',
                gogogo,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
        axios.delete(url + '/admin/onlineTest/deleteById?id=' + id,
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
                align: 'center',
                width: 300

            },
            {
                title: '在线测评内容',
                dataIndex: 'onlineTest_destination',
                align: 'center',
                width: 700

            },
            {
                title: '在线测评地址',
                dataIndex: 'onlineTest_url',
                width: 1
            },
            {
                title: '在线测评时间',
                dataIndex: 'onlineTest_time',
                align: 'center',
                width: 118
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
                </Button><h2>在线测评信息管理</h2>
            <Table
                scroll={{ x: true }}
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                destroyOnClose
                title="新建在线测评"
                visible={this.state.Newvisible}
                okText='确认新建'
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
                <Input
                    addonBefore="评测文件"
                    type="file"></Input>
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
                <Input
                    addonBefore="评测文件"
                    type="file"></Input>
            </Modal>
        </>)
    }
}

export default App;