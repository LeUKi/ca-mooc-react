import React from 'react';
import { Tabs, Card, Button, Tag } from 'antd';
//import { HashRouter as Link } from 'react-router-dom'
import axios from 'axios'
import { FileOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;


class Query extends React.Component {
    state = {
        myDATA: []
    }
    getDATA() {
        axios.get('http://118.178.125.139:8060/guest/onlineTest/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.OnlineTests.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={(item.onlineTest_title).slice(0, 7)} key={index}>
                            <div>
                                <h3 style={{ textAlign: "center" }}>
                                    <Tag style={{ float: "right" }}>id:{item.oid}</Tag>
                                    {item.onlineTest_title}</h3>
                                <p>{item.onlineTest_destination}</p>
                                <a target={'_blank'} rel="noopener noreferrer" href={'http://118.178.125.139:8060'+item.onlineTest_url}>
                                    <Button shape="round" icon={<FileOutlined />}>
                                        {item.onlineTest_url.split('test/')[1]}
                                    </Button>
                                </a>
                                <p style={{ float: "right" }}>{item.onlineTest_time}</p>
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
            <Card hoverable title='在线测评' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;