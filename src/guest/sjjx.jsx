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
        axios.get('http://118.178.125.139:8060/guest/practicalTeach/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.PracticalTeachs.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={item.practicalTeach_title} key={index}>
                            <div>
                                <h3 style={{ textAlign: "center" }}>
                                    <Tag style={{ float: "right" }}>id:{item.pid}</Tag>
                                    {item.practicalTeach_title}</h3>
                                <p>{item.practicalTeach_destination}</p>
                                <a target={'_blank'} rel="noopener noreferrer" href={item.practicalTeach_url}>
                                    <Button shape="round" icon={<LinkOutlined />}>
                                        {item.practicalTeach_url}
                                    </Button>
                                </a>
                                <p style={{ float: "right" }}>{item.practicalTeach_destination}</p>
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
            <Card hoverable title='实践教学' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;