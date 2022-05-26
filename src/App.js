import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, HomePage, Cryptocurrencies, CryptoDetails, News, Watchlist } from './components';
import './App.css';


const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Route exact path='/cryptocurrencies'>
                <Cryptocurrencies />
              </Route>
              <Route exact path='/watchlist'>
                <Watchlist />
              </Route>
              <Route exact path='/crypto/:coinId'>
                <CryptoDetails />
              </Route>
              <Route exact path='/news'>
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{color: 'white', textAlign:'center'}}>
            Crypto World <br />
            All rights reserved <br />
            Developed by Andrés Rivera Hurtado
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/news'>News</Link>
            <Link to='/cryptocurrencies'>Cryptos</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App