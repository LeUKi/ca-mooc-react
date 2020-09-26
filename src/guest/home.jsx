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
                    temp.push(
                        <Collapse
                            defaultActiveKey={['0']}
                            key={index}
                            className={'Col'}
                            accordion>
                            <Panel header={GG.notice_title}>
                                <p>{GG.notice_destination}</p>
                                <p style={{ float: "right" }}>{GG.notice_time}</p>
                            </Panel>
                        </Collapse>)
                    this.setState({
                        GGlist: temp
                    });
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
        this.getGG();
        this.getJJ()
    }
    render() {
        return <div className="Home" key={new Date()}>
            <Card hoverable={true} className={'C1'} title={this.state.JJlist[0]}>
                <Carousel className={'Car'} autoplay>
                    <div style={contentStyle}>
                        <img src="https://pic.lafish.fun/20200926215138.png" />
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                </Carousel>
                <br />
                <p>{this.state.JJlist[1]}</p>
                <p style={{ float: "right", marginBottom: 0 }}>{this.state.JJlist[2]}</p>
            </Card>
            <Card hoverable={true} className={'C1'} title="公告">
                {this.state.GGlist}
            </Card>
        </div>

    }
}

export default Home;