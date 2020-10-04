import React from 'react';
import { Tabs, Card, Button, Tag } from 'antd';
//import { HashRouter as Link } from 'react-router-dom'
import axios from 'axios'
import { LinkOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;


class Query extends React.Component {
    state = {
        myDATA: []
    }
    getDATA() {
        axios.get('http://118.178.125.139:8060/guest/onlineClass/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.OnlineClasss.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={item.onlineClass_title} key={index}>
                            <div>
                                <h3 style={{ textAlign: "center" }}>
                                    <Tag style={{ float: "right" }}>id:{item.ocid}</Tag>
                                    {item.onlineClass_title}</h3>
                                <p>{item.onlineClass_destination}</p>
                                <a target={'_blank'} rel="noopener noreferrer" href={item.onlineClass_url}>
                                    <Button shape="round" icon={<LinkOutlined />}>
                                        {item.onlineClass_url}
                                    </Button>
                                </a>
                                <p style={{ float: "right" }}>{item.onlineClass_time}</p>
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
        document.title = '电路分析精品课程 - 网络课'
        this.getDATA()
    }
    render() {
        return <div className="Query" key='query'>
            <Card hoverable title='网络课' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;