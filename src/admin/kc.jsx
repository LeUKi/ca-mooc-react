/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React from 'react';
import { Table, Button, Modal, Input, message, Popconfirm, Tooltip } from 'antd';
import axios from 'axios'
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    VideoCameraOutlined,
    FilePptOutlined,
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
        axios.get(url+'/guest/case/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.CaseLibrarys.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        key: index,
                        cid: GG.cid,
                        case_library_title: GG.case_library_title,
                        case_library_video: (
                            <Tooltip title={GG.case_library_video}>
                                <Button type={"link"}
                                    icon={<VideoCameraOutlined />}
                                    href={url+GG.case_library_video} />
                            </Tooltip>),
                        case_library_text: (
                            <Tooltip title={GG.case_library_text}>
                                <Button type={"link"}
                                    icon={<FilePptOutlined />}
                                    href={url+GG.case_library_text} />
                            </Tooltip>),
                        case_library_destination: GG.case_library_destination,
                        case_library_time: GG.case_library_time,
                        Actions: (<div>
                            <Tooltip title="编辑" placement={'left'} color={'blue'}>
                                <Button
                                    type='primary'
                                    icon={<EditOutlined />}
                                    size='small'
                                    onClick={() => this.Edit(GG.cid)} />
                            </Tooltip>
                            <br />
                            <Popconfirm
                                title="你确定吗？"
                                okText='我确定'
                                cancelText='取消'
                                okType='danger'
                                placement='left'
                                onConfirm={() => this.Del(GG.cid)}
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
            formData.append('case_library_title', this.state.value_1)
            formData.append('case_library_destination', this.state.value_2)
            formData.append('caseVideo',
                document.querySelector('input[type="file"]#file1').files[0])
            formData.append('casePPT',
                document.querySelector('input[type="file"]#file2').files[0])

            axios.post(url+'/admin/case/add',
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
            this.state.value_1 = this.state.getData.find(i => i.cid === id).case_library_title;
            this.state.value_2 = this.state.getData.find(i => i.cid === id).case_library_destination;
            this.state.value_3 = id;
            this.state.value_4 = this.state.getData.find(i => i.cid === id).case_library_url;
            this.setState({
                Editvisible: true
            })
        } else {
            let gogogo = new FormData();
            gogogo.append('case_library_title', this.state.value_1)
            gogogo.append('case_library_destination', this.state.value_2)
            gogogo.append('id', this.state.value_3)
            gogogo.append('caseVideo',
                document.querySelector('input[type="file"]#file1').files[0])
            gogogo.append('casePPT',
                document.querySelector('input[type="file"]#file2').files[0])

            axios.post(url+'/admin/case/update',
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
        axios.delete(url+'/admin/case/deleteById?id=' + id,
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
                dataIndex: 'cid',
                width: 1
            },
            {
                title: '课程主题',
                dataIndex: 'case_library_title',
                align: 'center',
                width: 300

            },
            {
                title: '课程内容',
                dataIndex: 'case_library_destination',
                align: 'center',
                width: 700

            },
            {
                title: '课程视频',
                dataIndex: 'case_library_video',
                width: 1
            }, {
                title: '课程教案',
                dataIndex: 'case_library_text',
                width: 1
            },
            {
                title: '课程时间',
                dataIndex: 'case_library_time',
                align: 'center',
                width: 118
            }, {
                title: '操作',
                dataIndex: 'Actions',
                width: '1%'
            },
        ];
        return (<>
            <Button
                onClick={this.New}
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: "right", marginBottom: '10px' }}>
                新建
                </Button><h2>课程信息管理</h2>
            <Table
                scroll={{ x: true }}
                dataSource={this.state.getData}
                columns={columns}
                bordered={true}
            />
            <Modal
                destroyOnClose
                title="新建课程"
                visible={this.state.Newvisible}
                okText='确认新建'
                cancelText='取消'
                onOk={this.New}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    placeholder='课程主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    placeholder='课程内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <Input
                    id='file1'
                    addonBefore="课程视频"
                    type="file"></Input>
                <Input
                    id='file2'
                    addonBefore="课程教案"
                    type="file"></Input>
            </Modal>

            <Modal
                destroyOnClose
                title="修改课程"
                visible={this.state.Editvisible}
                okText='确认修改'
                cancelText='取消'
                onOk={this.Edit}
                onCancel={this.handleCancel}
            >
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_1 = value }}
                    defaultValue={this.state.value_1}
                    placeholder='课程主题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={({ target: { value } }) => { this.state.value_2 = value }}
                    defaultValue={this.state.value_2}
                    placeholder='课程内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea>
                <Input
                    id='file1'
                    addonBefore="课程视频"
                    type="file"></Input>
                <Input
                    id='file2'
                    addonBefore="课程教案"
                    type="file"></Input>
            </Modal>
        </>)
    }
}

export default App;