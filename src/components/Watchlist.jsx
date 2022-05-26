import React, {useEffect, useState} from 'react';
import {Col, Row, Typography, Card, Select, Form, Button} from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Title} = Typography;
const {Option} = Select;

const Watchlist = () => {
    const {data: cryptosList} = useGetCryptosQuery(100);
    const [watchlist, setWatchlist] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');

    const onFinishHandler = () =>{
        const selectedData = cryptosList.data.coins.find(item => item.name === selectedItem);
        setWatchlist([
            ...watchlist,
            selectedData
        ]);
        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
        savedWatchlist.push(selectedData);
        localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
    }
    console.log(watchlist)

    useEffect(()=>{
        if(!localStorage.getItem("watchlist")){
            localStorage.setItem("watchlist",JSON.stringify([]));
        }
        setWatchlist(JSON.parse(localStorage.getItem("watchlist")));
    }, [])

    const removeFromDom = (id) => {
        setWatchlist(watchlist.filter(item => item.uuid !== id))
        let savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
        savedWatchlist = watchlist.filter(item => item.uuid !== id);
        localStorage.setItem("watchlist", JSON.stringify(savedWatchlist));
    }

    return (
        <>
            <Title level={1}> Your Favorite Cryptos</Title>
            <Col span={24}>
                <Form onFinish={onFinishHandler}>
                    <Form.Item className='crypto-card'>
                    <div style={{textAlign:'center'}}>
                        <Select placeholder='Select a Crypto' onChange={(event)=> {setSelectedItem(event)}}>
                            {
                                cryptosList?.data?.coins.map((coin, i)=>
                                    <Option value={coin.name} name={coin.name} key={i} >{coin.name}</Option>
                                )
                            }
                        </Select> <br />
                        <Button block className='watchlist-button' type='primary' htmlType='submit'>Add to Watchlist</Button>
                    </div>
                    </Form.Item>
                </Form>
                <hr />
                <Row gutter={[32, 32]} className='crypto-card-container'>
                    {cryptosList && watchlist.map((item,i)=>{
                        return  <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.uuid}>
                                    <Link to={`/crypto/${item.uuid}`}>
                                        <Card 
                                            title={`${item.rank}. ${item.name}`}
                                            extra={<img className='crypto-image' src={item.iconUrl} alt='item' />}
                                            hoverable
                                        >
                                            <p>Price: $ {millify(item.price,{precision: 3})}</p>
                                            <p>Market Cap: $ {millify(item.marketCap)}</p>
                                            <p>Daily Change: {millify(item.change)}%</p>
                                        </Card>
                                    </Link>
                                    <br />
                                    <Button type='danger' onClick={() => removeFromDom(item.uuid)}>
                                        Delete
                                    </Button>
                                </Col>
                    })}
                </Row>
            </Col>
        </>
    )
}

export default Watchlist