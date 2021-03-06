import React from 'react';
import { Carousel, Collapse, Card } from 'antd';
import axios from 'axios'

const { Panel } = Collapse;


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class Home extends React.Component {
    state = {
        GGlist: [],
        JJlist: []
    }
    getGG() {
        axios.get('http://118.178.125.139:8060/guest/notice/findAll?page=0&size=99',).then(
            res => {
                const GGdata = res.data.extended.notices.content;
                const temp = [];
                GGdata.map((GG, index) => {
                    temp.push(<Panel
                        header={GG.notice_title}
                        key={index}>
                        <p>{GG.notice_destination}</p>
                        <p style={{ float: "right" }}>{GG.notice_time}</p>
                    </Panel>)
                    this.setState({
                        GGlist: temp
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
                    JJlist: [JJdata.introduce_title, JJdata.introduce_destination, JJdata.introduce_time]
                })
            })
    }
    componentWillMount() {
        document.title = '电路分析精品课程 - 首页'
        this.getGG();
        this.getJJ()
    }
    render() {
        return <div className="Home" key={new Date()}>
            <Card hoverable={true} className={'C1'} title={this.state.JJlist[0]}>
                <Carousel className={'Car'} autoplay>
                    <div style={contentStyle}>
                        <img src="https://pic.lafish.fun/20200926215138.png" alt='' />
                    </div>
                    <div>
                        <img src="https://pic.lafish.fun/20200926215138.png" alt='' />
                    </div>
                    <div>
                        <img src="https://pic.lafish.fun/20200926215138.png" alt='' />
                    </div>
                </Carousel>
                <br />
                <p>{this.state.JJlist[1]}</p>
                <p style={{ float: "right", marginBottom: 0 }}>{this.state.JJlist[2]}</p>
            </Card>
            <Card hoverable={true} className={'C1'} title="公告">
                <Collapse
                    defaultActiveKey={['0']}
                    className={'Col'}
                    accordion>
                    {this.state.GGlist}
                </Collapse>
            </Card>
        </div>

    }
}

export default Home;