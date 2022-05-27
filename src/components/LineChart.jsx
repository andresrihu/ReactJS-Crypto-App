import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler} from 'chart.js';
import {Col, Row, Typography} from 'antd';

const { Title } = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    for(let i = 0; i<coinHistory?.data?.history?.length; i++){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString());
    }

    const data = {
        // backgroundColor:"rgba(0, 189, 148, .75)",
        labels: coinTimeStamp.reverse(),
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice.reverse(),
                fill: true,
                backgroundColor: 'rgba(0, 189, 148, .75)',
                borderColor: '#0071bd'
            },
        ],
    };

    const options = {
        
        scale: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart:</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>Price Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart