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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// async function getGG() {
//     var returnGG;
//     await axios.get(`http://118.178.125.139:8060/guest/notice/findAll?page=0&size=999`,
//         { headers: { 'Content-Type': 'application/json', } }).then(
//             res => {
//                 console.log(res);
//                 console.log(res.data.extended.notices.content[0]);
//                 const GGlist = res.data.extended.notices.content;
//                 GGlist.map((GG, index) => {
//                     return <Panel header={GG.notice_title} key={index}>
//                         <p>{GG.notice_destination}</p>
//                     </Panel>
//                 })
//             }

//         )
//         console.log(returnGG);
//     return returnGG;
// }

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
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                </Carousel>
                <p>{this.state.JJlist[1]}</p>
                <p style={{ float: "right" }}>{this.state.JJlist[2]}</p>
            </Card>
            <Card hoverable={true} className={'C1'} title="公告">
                {this.state.GGlist}
            </Card>
        </div>

    }
}

export default Home;