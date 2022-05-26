import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm])
    

    // console.log(cryptos);

    if(isFetching) return <Loader/>;

    return (
        <>
            {!simplified &&(
                <div className="search-crypto" >
                    <Input placeholder='Search Cryptocurrency' onChange={(event) => setSearchTerm(event.target.value)}/>
                </div>
            )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((coin)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
                        <Link to={`/crypto/${coin.uuid}`}>
                            <Card 
                                title={`${coin.rank}. ${coin.name}`}
                                extra={<img className='crypto-image' src={coin.iconUrl} alt='coin' />}
                                hoverable
                            >
                                <p>Price: $ {millify(coin.price,{precision: 3})}</p>
                                <p>Market Cap: {millify(coin.marketCap)}</p>
                                <p>Daily Change: {millify(coin.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;