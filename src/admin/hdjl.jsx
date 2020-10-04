/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Button, Modal, Input, message, Popconfirm } from 'antd';
import axios from 'axios'
import qs from 'qs'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
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

    }
    componentWillMount() {
        this.getDt()
    }
    getDt = () => {
        axios.get('http://118.178.125.139:8060/guest/interactionQuestion/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.InteractionQuestions.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    const Aall = [];
                    GG.interactionAnswers.map((A, i) => {
                        Aall.push(A.answer)
                    })
                    GGafter.push({
                        key: index,
                        qid: GG.qid,
                        interactionQuestion_title: GG.interactionQuestion_title,
                        interactionAnswers: Aall,
                        interactionQuestion_time: GG.interactionQuestion_time,
                        Actions: (<div>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(GG.qid)}>
                                编辑
                            </Button>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.qid)}
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
            axios.post('http://118.178.125.139:8060/admin/lecture/add',
                qs.stringify({
                    'interactionQuestion_title': this.state.value_1,
                    'lecture_destination': this.state.value_2
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
            this.state.value_1 = this.state.getData.find(i => i.qid === id).interactionQuestion_title
            this.state.value_2 = this.state.getData.find(i => i.qid === id).lecture_destination
            this.state.value_3 = id
            this.setState({
                Editvisible: true
            })
        } else {

            axios.post('http://118.178.125.139:8060/admin/lecture/update',
                qs.stringify({
                    'lecture_destination': this.state.value_2,
                    'interactionQuestion_title': this.state.value_1,
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
        axios.delete('http://118.178.125.139:8060/admin/lecture/deleteById?id=' + id,
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
                dataIndex: 'qid',
                width: 1
            },
            {
                title: '提问内容',
                dataIndex: 'interactionQuestion_title',
                width: '30%'
            },
            {
                title: '提问时间',
                dataIndex: 'interactionQuestion_time',
                width: '40%'
            },
            {
                title: '回复管理',
                dataIndex: 'interactionAnswers',
                width: '20%'
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
                </Button><h2>修改讲座信息</h2>
            <Table
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                title="新建讲座"
                visible={this.state.Newvisible}
                okText='确认新建'
                cancelText='取消'
                onOk={this.New}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    placeholder='讲座主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    placeholder='讲座内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
            </Modal>

            <Modal
                destroyOnClose
                title="修改讲座"
                visible={this.state.Editvisible}
                okText='确认修改'
                cancelText='取消'
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    defaultValue={this.state.value_1}
                    placeholder='讲座主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    defaultValue={this.state.value_2}
                    placeholder='讲座内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
            </Modal>
        </>)
    }
}

export default App;