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
    render() {
        const GGlist = [];
        axios.get('http://118.178.125.139:8060/guest/notice/findAll?page=0&size=999',
            { headers: { 'Content-Type': 'application/json', } }).then(
                res => {
                    console.log(res);
                    console.log(res.data.extended.notices.content[0]);
                    const GGdata = res.data.extended.notices.content;
                    GGdata.map((GG, index) => (
                        GGlist.push(<Panel header={GG.notice_title} key={index}>
                            <p>{GG.notice_destination}</p>
                        </Panel>)
                    ))
                    console.log(GGlist);
                }

            )
        return  <div className="Home" key='home'>
                <Card hoverable={true} className={'C1'} title="课程简介">
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
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card hoverable={true} className={'C1'} title="公告">
                    {GGlist}
                    <Collapse
                        className={'Col'} accordion>
                        <Panel header="This is panel header 1" key="1">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </Card>

            </div>
        
    }
}

export default Home;