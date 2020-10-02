import React from 'react';
import { Card, Input, Button, message, Table, Modal } from 'antd';
import axios from 'axios'
import qs from 'qs'
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
const { TextArea } = Input;


class Home extends React.Component {
    state = {
        JJbefore: '',
        JJafter: '',
        newcontent1: '',
        newcontent2: '',
        Modalwhat: 0,//0新建、1编辑、2删除
        Modaltitle: '',
        Modalshow: false,
        ModalLoading: false,
        Modalcontent: [],
        GGdata: []
    };

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    Edit = (id) => {
        this.state.Modalwhat = 1

        this.setState({
            Modalshow: true
        })
        console.log(id);
    }
    Modalclose = (id) => {
        this.setState({
            Modalshow: false
        })
        message.success('123')
    }
    Del = (id) => {
        this.state.Modalwhat = 2

        this.setState({
            Modalshow: true
        })
    }
    new = () => {
        this.state.Modaltitle = '新建公告'
        this.state.Modalcontent =
            <>
                <TextArea
                    onChange={this.state.Changecontent1}
                    placeholder='公告标题...'
                    autoSize>
                </TextArea>
                <TextArea
                    onChange={this.state.Changecontent2}
                    placeholder='公告内容...'
                    autoSize={{ minRows: 2 }}>
                </TextArea></>

        this.state.Modalwhat = 0
        this.setState({
            Modalshow: true
        })
    }
    Changecontent1 = ({ target: { value } }) => {
        this.setState({ newcontent1: value });
    };
    Changecontent2 = ({ target: { value } }) => {
        this.setState({ newcontent2: value });
    };
    Modalok = () => {
        if (this.state.Modalwhat === 0) {//新建
            this.setState({
                ModalLoading: true
            })
            const data = { 'notice_destination': this.state.newcontent2, 'notice_title': this.state.newcontent1 }
            axios.post('http://118.178.125.139:8060/admin/notice/add', qs.stringify(data), {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "token": sessionStorage.token
                }
            }).then(res => {
                this.setState({
                    ModalLoading: false,
                    Modalshow: false
                })
                message.success('nice')
                this.getGG()
            })

        } else if (this.state.Modalwhat === 1) {//编辑
            message.success('1111')

        } else if (this.state.Modalwhat === 2) {//删除
            message.success('2222')

        }
    }
    getGG() {
        axios.get('http://118.178.125.139:8060/guest/notice/findAll?page=0&size=99',).then(
            res => {
                const GGbefore = res.data.extended.notices.content;
                const GGafter = []
                GGbefore.map((GG, index) => {
                    GGafter.push({
                        nid: GG.nid,
                        notice_title: GG.notice_title,
                        notice_destination: GG.notice_destination,
                        Actions: (<div key={index}>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='small'
                                onClick={() => this.Edit(GG.nid)}>
                                编辑
                            </Button>
                            <br />
                            <Button
                                type='primary'
                                danger
                                icon={<DeleteOutlined />}
                                size='small'
                                onClick={() => this.Del(GG.nid)}>
                                删除
                            </Button>
                        </div>)
                    })
                    console.log(GGafter);
                    this.setState({
                        GGdata: GGafter
                    });
                    return ''
                })
            }
        )
    }

    getJJ() {
        axios.get('http://118.178.125.139:8060/guest/introduce/find',).then(
            res => {
                const JJdata = res.data.extended.Introduce;

                this.setState({
                    JJbefore: JJdata.introduce_destination,
                    JJafter: JJdata.introduce_destination

                })
            }
        )
    }
    okJJ = () => {
        const data = { 'introduce_destination': this.state.JJafter, 'id': 1, 'introduce_title': ' “电路分析”课程简介', }
        axios.post('http://118.178.125.139:8060/admin/introduce/update', qs.stringify(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                "token": sessionStorage.token
            }
        }).then(res => {
            message.success('修改成功');
        })
    }

    componentWillMount() {
        this.getJJ();
        this.getGG()
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
            },
            {
                title: '公告内容',
                dataIndex: 'notice_destination',
                width: '50%'
            }, {
                title: '操作',
                dataIndex: 'Actions',
                width: 1
            },
        ];
        const { JJafter } = this.state;
        return <div className="in" key='adminhome'>
            <Card type='inner'>
                <h3>修改简介</h3>
                <TextArea
                    placeholder="简介信息"
                    value={JJafter}
                    onChange={this.onChange}
                    autoSize />
                <Button
                    type="primary"
                    style={{ float: "right", marginTop: '10px' }}
                    onClick={this.okJJ}
                    disabled={this.state.JJafter === this.state.JJbefore}>修改</Button>
            </Card>
            <br />
            <Card type='inner'>
                <Button
                    onClick={this.new}
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ float: "right", marginBottom: '10px' }}>
                    新建
                </Button>
                <h3>修改公告</h3>
                <Table
                    dataSource={this.state.GGdata}
                    columns={columns}
                    bordered={true}
                ></Table>
            </Card>
            <Modal
                title={this.state.Modaltitle}
                visible={this.state.Modalshow}
                onOk={this.Modalok}
                confirmLoading={this.state.ModalLoading}
                onCancel={this.Modalclose}
            >
                <p>{this.state.Modalcontent}</p>
            </Modal>
        </div>
    }
}

export default Home;