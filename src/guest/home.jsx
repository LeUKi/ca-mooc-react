import React from 'react';
import { Row, Col } from 'antd';


function Home() {
    return <div className="Home" key='home'>

        <Row >
            <Col span={2} className={'test'}>123</Col>
            <Col span={2} className={'test'}>123</Col>
            <Col span={2} className={'test'}>123</Col>
        </Row>
    </div>
}

export default Home;