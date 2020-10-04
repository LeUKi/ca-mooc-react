import React from 'react';
import { Tabs, Card, Tag, Comment, Avatar } from 'antd';
//import { HashRouter as Link } from 'react-router-dom'
import axios from 'axios'

const { TabPane } = Tabs;


class Query extends React.Component {
    state = {
        myDATA: []
    }
    getDATA() {
        axios.get('http://118.178.125.139:8060/guest/interactionQuestion/findAll?page=0&size=999',).then(
            res => {
                const getdata = res.data.extended.InteractionQuestions.content;
                const temp = []
                getdata.map((item, index) => {
                    temp.push(
                        <TabPane tab={(item.interactionQuestion_title).slice(0, 6) + '...'} key={index}>
                            <h3 style={{ textAlign: "center" }}>
                                <Tag style={{ float: "right" }}>id:{item.qid}</Tag>
                                {item.interactionQuestion_title}
                            </h3>
                            <p style={{ float: "right" }}>{item.interactionQuestion_time}</p>
                            {item.interactionAnswers.map((initem, inindex) => {
                                return (
                                    <Comment
                                        key={inindex}
                                        avatar={
                                            <Avatar
                                                src='../favicon.ico'
                                            />
                                        }
                                        datetime={
                                            <Tag>{initem.interactionAnswer_time}</Tag>
                                        }
                                        content={
                                            <p>
                                                {initem.answer}
                                            </p>
                                        }
                                    >
                                    </Comment>
                                )

                            })}

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
        document.title = '电路分析精品课程 - 互动交流'
        this.getDATA()
    }
    render() {
        return <div className="Query" key='query'>
            <Card hoverable title='互动交流' className={'C1'}>
                <Tabs tabPosition={"left"}>
                    {this.state.myDATA}
                </Tabs>
            </Card>

        </div>
    }
}
export default Query;