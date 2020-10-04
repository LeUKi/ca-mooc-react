/* eslint-disable react/no-direct-mutation-state */
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


class Demo extends React.Component {
    state = {
        size: 'default',
        expandable:true,
        hasData: true,
        Newvisible: false,
        Editvisible: false,
        iNewvisible: false,
        iEditvisible: false,
        value_1: '',
        value_2: '',
        value_3: '',
    };
    getDt = () => {
        axios.get('http://118.178.125.139:8060/guest/interactionQuestion/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.InteractionQuestions.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        qid: GG.qid,
                        interactionQuestion_title: GG.interactionQuestion_title,
                        interactionAnswers: GG.interactionAnswers,
                        interactionQuestion_time: GG.interactionQuestion_time
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


    iNew = (id) => {
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
    iEdit = (id) => {
        if (this.state.Editvisible === false) {
            this.state.value_1 = this.state.getData.find(i => i.aid === id).interactionQuestion_title
            this.state.value_2 = this.state.getData.find(i => i.aid === id).lecture_destination
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
    iDel = (id) => {
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

    handleCancel=()=>{
        this.setState({
            Newvisible: false,
            Editvisible: false,
            iNewvisible: false,
            iEditvisible: false,
            value_1: '',
            value_2: '',
            value_3: '',
        })
    }
    componentWillMount() {
        this.getDt()
    }

    render() {
        const { ...state } = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'qid',
            },
            {
                title: '提问内容',
                align: 'center',
        
                dataIndex: 'interactionQuestion_title',
            },
            {
                title: '提问时间',
                align: 'center',
                dataIndex: 'interactionQuestion_time',
            },
            {
                title: '操作',
                key: 'action',
                align: 'right',
                render: (record) => (
                    <div>
                        <Tooltip title={<span style={{ color: "black" }}>添加回复</span>} placement={'left'} color={'white'}>
                            <Button
                                icon={<PlusOutlined />}
                                size='small'
                                onClick={() => this.iNew(record.qid)} />
                        </Tooltip>
                        <br />
                        <Tooltip title="编辑问题" placement={'left'} color={'blue'}>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(record.qid)} />
                        </Tooltip>
                        <br />
                        <Popconfirm
                            title="你确定吗？"
                            okText='我确定'
                            cancelText='取消'
                            okType='danger'
                            placement='left'
                            onConfirm={() => this.Del(record.qid)}
                            arrowPointAtCenter
                            icon={<QuestionCircleOutlined
                                style={{ color: 'red' }} />}>
                            <Tooltip title="删除问题及回复" placement={'left'} color={'red'}>
                                <Button
                                    type='danger'
                                    icon={<DeleteOutlined />}
                                    size='small' />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
        const innercolumns = [
            { title: 'id', dataIndex: 'aid' },
            { title: '回复', dataIndex: 'answer', align: 'center' },
            { title: '回复时间', dataIndex: 'interactionAnswer_time', align: 'center' },
            {
                title: '操作', key: 'action', align: 'right',
                render: (record) => (
                    <div>
                        <Tooltip title="编辑回复" placement={'left'} color={'blue'}>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => { this.iEdit(record.aid) }} />
                        </Tooltip>
                        <br />
                        <Popconfirm
                            title="你确定吗？"
                            okText='我确定'
                            cancelText='取消'
                            okType='danger'
                            placement='left'
                            onConfirm={() => this.iDel(record.aid)}
                            arrowPointAtCenter
                            icon={<QuestionCircleOutlined
                                style={{ color: 'red' }} />}>
                            <Tooltip title="删除回复" placement={'left'} color={'red'}>
                                <Button
                                    type='danger'
                                    icon={<DeleteOutlined />}
                                    size='small' />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                )
            }]

        return (
            <>
                <Button
                    onClick={this.New}
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ float: "right", marginBottom: '10px' }}>
                    新建提问
                </Button><h2>互动交流管理</h2>
                <Table
                    {...state}
                    expandable={{expandedRowRender: (record) => {
                        return <Table
                            columns={innercolumns}
                            dataSource={record.interactionAnswers}
                            pagination={false}></Table>;
                    }}}
                    expandRowByClick={true}
                    columns={columns}
                    dataSource={this.state.getData}
                />



                <Modal
                    title="新建提问"
                    visible={this.state.Newvisible}
                    okText='确认新建'
                    cancelText='取消'
                    onOk={this.New}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        onChange={({ target: { value } }) => { this.state.value_1 = value }}
                        placeholder='提问内容...'
                        autoSize>
                    </TextArea>
                </Modal>

                <Modal
                    destroyOnClose
                    title="修改提问"
                    visible={this.state.Editvisible}
                    okText='确认修改'
                    cancelText='取消'
                    onOk={this.Edit}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        onChange={({ target: { value } }) => { this.state.value_1 = value }}
                        defaultValue={this.state.value_1}
                        placeholder='提问内容...'
                        autoSize>
                    </TextArea>
                </Modal>




                <Modal
                    title="新建回复"
                    visible={this.state.iNewvisible}
                    okText='确认新建'
                    cancelText='取消'
                    onOk={this.iNew}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        onChange={({ target: { value } }) => { this.state.value_1 = value }}
                        placeholder='回复内容...'
                        autoSize>
                    </TextArea>
                </Modal>

                <Modal
                    destroyOnClose
                    title="修改回复"
                    visible={this.state.iEditvisible}
                    okText='确认修改'
                    cancelText='取消'
                    onOk={this.iEdit}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        onChange={({ target: { value } }) => { this.state.value_1 = value }}
                        defaultValue={this.state.value_1}
                        placeholder='回复内容...'
                        autoSize>
                    </TextArea>
                </Modal>

            </>
        );
    }
}

export default Demo