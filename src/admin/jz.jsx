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
        axios.get('http://118.178.125.139:8060/guest/lecture/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.Lectures.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        lid: GG.lid,
                        lecture_title: GG.lecture_title,
                        lecture_destination: GG.lecture_destination,
                        lecture_time: GG.lecture_time,
                        Actions: (<div>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(GG.lid)}>
                                编辑
                            </Button>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.lid)}
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
                    'lecture_title': this.state.value_1,
                    'lecture_destination': this.state.value_2
                }),
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "token": sessionStorage.token
                    }
                }).then(res => {
                    this.setState({
                        Newvisible: false
                    })
                    message.success('成功添加')
                    this.getDt()
                })
        }
    }
    Edit = (id) => {
        if (this.state.Editvisible === false) {
            this.setState({
                Editvisible: true
            })
        } else {
            this.setState({
                Editvisible: false
            })
        }
    }
    Del = (id) => {
        message.success(id)
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
                dataIndex: 'lid',
                width: 1
            },
            {
                title: '讲座主题',
                dataIndex: 'lecture_title',
                width: '30%'
            },
            {
                title: '讲座内容',
                dataIndex: 'lecture_destination',
                width: '40%'
            },
            {
                title: '讲座时间',
                dataIndex: 'lecture_time',
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
                title="增"
                visible={this.state.Newvisible}
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
                title="改"
                visible={this.state.Editvisible}
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <p>{}</p>
            </Modal>
        </>)
    }
}

export default App;