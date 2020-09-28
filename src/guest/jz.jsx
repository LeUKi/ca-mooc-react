import React from 'react';
import { Tabs, Card,  Tag } from 'antd';
//import { HashRouter as Link } from 'react-router-dom'
import axios from 'axios'

const { TabPane } = Tabs;


class Query extends React.Component {
    state = {
        myDATA: []
    }
    getDATA() {
        axios.get('http://118.178.125.139:8060/guest/lecture/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.Lectures.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={item.lecture_title} key={index}>
                            <div>
                                <h3 style={{ textAlign: "center" }}>
                                    <Tag style={{ float: "right" }}>id:{item.lid}</Tag>
                                    {item.lecture_title}</h3>
                                <p>{item.lecture_destination}</p>
                                <p style={{ float: "right" }}>{item.lecture_time}</p>
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
            <Card hoverable title='讲座' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;