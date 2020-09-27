import React from 'react';
import { Tabs, Card, Button } from 'antd';
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
                                <h3 style={{ textAlign: "center" }}>{item.onlineClass_title}</h3>
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
        this.getDATA()
    }
    render() {
        return <div className="Query" key='query'>
            <Card hoverable title='网络课安排' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>
            <Card hoverable title='在线测评' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card><Card hoverable title='网络课安排' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card><Card hoverable title='网络课安排' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>
        </div>
    }
}
export default Query;