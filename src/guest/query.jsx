import React from 'react';
import { Tabs, Card } from 'antd';
const { TabPane } = Tabs;



class Query extends React.Component {

    

    render() {
        return <div className="Query" key='query'>
            <Card className={'C1'}>
                <Tabs tabPosition={"left"}>
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab 1
                </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab 2
                </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab 3
                </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}
export default Query;