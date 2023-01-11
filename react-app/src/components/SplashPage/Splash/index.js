
import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../../Footer';
import SplashNavBar from '../SplashNavBar';
import api1 from '../../../img/api1.png'
import api2 from '../../../img/api2.png'
import api3 from '../../../img/api3.png'
import api4 from '../../../img/api4.png'

import './Splash.css'


function Splash() {

  return (
    <>
      <SplashNavBar />
      <div className='Splash-page-container'>

        <div className='splash-first-page-container'>
          <div className='splash-first-page-word-1'>
            Run your money
          </div>
          <br></br>
          <div className='splash-first-page-word-2'>
            Invest with stocks, crypto, and cash
          </div>

          <div className='splash-first-page-word-2'>
            on your terms.
          </div>
          <br></br>
          <div className='splash-login'>
            <NavLink className='splash-login-button' to={`/login`}>Get Started</NavLink>
          </div>
        </div>
      </div>

      <div className='api-about'>Check out</div>
      <div className='api-container'>

        <div className='api-small-container'>
          <img className='api-img' src={api1} />
          <div className='api-bottom-div'>
            <div className='api-left-title'>Project Repository</div>
            <div className='api-right'>
              <div className='api-right-word'>RobinWhod is a website inspired by Robinhood, a stock trading website, where users are able to manage their portfolios of stocks and track the performance of various stocks on the market overtime.</div>
              <div className='api-right-button'>
                <a target='_blank' href='https://github.com/NYDF/RobinWhod'>
                  <div className='api-button'>Link to Github repository</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='api-small-container'>
          <img className='api-img' src={api2} />
          <div className='api-bottom-div'>
            <div className='api-left-title'>Yahoo Finance API</div>
            <div className='api-right'>
              <div className='api-right-word'>This application utilizes the Yahoo Finance API, a range of libraries/APIs/methods to obtain historical and real time data for a variety of financial markets and products.</div>
              <div className='api-right-button'>
                <a target='_blank' href='https://yahoo-finance-api.vercel.app/'>
                  <div className='api-button'>Link to Yahoo Finance</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='api-small-container'>
          <img className='api-img' src={api3} />
          <div className='api-bottom-div'>
            <div className='api-left-title'>Alpha Vantage API</div>
            <div className='api-right'>
              <div className='api-right-word'>Company data is fetched from Alpha Vantage, an API that provides enterprise-grade market data for assets ranging from stocks and ETFs to cryptocurrencies.</div>
              <div className='api-right-button'>
                <a target='_blank' href='https://www.alphavantage.co/#page-top'>
                  <div className='api-button'>Link to Alpha Vantage</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='api-small-container'>
          <img className='api-img' src={api4} />
          <div className='api-bottom-div'>
            <div className='api-left-title'>Finnhub Stock API</div>
            <div className='api-right'>
              <div className='api-right-word'>General market and company news are provided by Finnhub, a Real-Time RESTful APIs and Websocket for Stocks, Currencies, and Crypto.</div>
              <div className='api-right-button'>
                <a target='_blank' href='https://finnhub.io/'>
                  <div className='api-button'>Link to Finnhub</div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Splash;
