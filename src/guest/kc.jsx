import React from 'react';
import { Tabs, Card, Button, Tag } from 'antd';
//import { HashRouter as Link } from 'react-router-dom'
import axios from 'axios'
import {
    VideoCameraOutlined,
    FilePptOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;


class Query extends React.Component {
    state = {
        myDATA: []
    }
    getDATA() {
        axios.get('http://118.178.125.139:8060/guest/case/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.CaseLibrarys.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={(item.case_library_title).slice(0, 10)} key={index}>
                            <div>
                                <h3 style={{ textAlign: "center" }}>
                                    <Tag style={{ float: "right" }}>id:{item.cid}</Tag>
                                    {item.case_library_title}</h3>
                                <p>{item.case_library_destination}</p>
                                <a target={'_blank'} rel="noopener noreferrer" href={'http://118.178.125.139:8060' + item.onlineTest_url}>
                                    <Button shape="round" icon={<VideoCameraOutlined />}>
                                        {item.case_library_video}
                                    </Button>
                                </a>
                                <a target={'_blank'} rel="noopener noreferrer" href={'http://118.178.125.139:8060' + item.case_library_text}>
                                    <Button shape="round" icon={<FilePptOutlined />}>
                                        {item.case_library_text}
                                    </Button>
                                </a>
                                <p style={{ float: "right" }}>{item.case_library_time}</p>
                            </div>
                        </TabPane>
                    )
                    return ''
                })
                this.setState({
                    myDATA: temp
                })
            })
    }
    componentWillMount() {
        this.getDATA()
    }
    render() {
        return <div className="Query" key='query'>
            <Card hoverable title='课程' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;