import React from 'react';
import { Tabs, Card } from 'antd';
import axios from 'axios'

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
                        <TabPane tab={item.ocid} key={index}>
                            <div>
                                
                            </div>
                        </TabPane>
                    )
                })


                this.setState({
                    myDATA: []
                })
            })
    }
    componentWillMount() {
        this.getDATA()
    }
    render() {
        return <div className="Query" key='query'>
            <Card className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab 3
                </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}
export default Query;