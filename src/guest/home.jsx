import React from 'react';
import { Carousel } from 'antd';
import banner from './banner.jpg'


const contentStyle = {
    width: '600px',
    height: '32vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundSize: 'cover',
  };

function Home() {
    return <div className="Home" key='home'>
        <Carousel autoplay>
            <div>
                <img style={contentStyle} src={banner} alt='pic' />
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
        </Carousel>    </div>
}

export default Home;