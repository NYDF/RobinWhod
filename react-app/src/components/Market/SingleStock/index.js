
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadCash from '../../Asset/LoadCash';
import LoadOneAsset from '../../Asset/LoadOneAsset';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';
import AddToWatchlistModal from '../../WatchList/AddToWatchlist';
import SingleStockGraph from '../SingleStockGraph';

import { AiOutlineDownCircle } from "react-icons/ai";

import './SingleStock.css'

function SingleStock() {

  const [marketPrice, setMarketPrice] = useState();
  const [isBuy, setIsBuy] = useState(true);
  const { symbol } = useParams();

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }

  return (
    <>

      <PortfolioNavBar showModal={showModal} setShowModal={setShowModal} closetable={closetable} />


      <div className='Single-Stock-page-container' onClick={() => setShowModal(false)}>

        <div className='Single-Stock-page-left'>
          <SingleStockGraph marketPrice={marketPrice} setMarketPrice={setMarketPrice} />
        </div>

        <div className='Single-Stock-page-right-big'>
          <div className='Single-Stock-page-right'>

            <span>
              <button className={isBuy? 's-buy-btn' : 's-buy-btn-d'} onClick={(e) => setIsBuy(true)}>Buy {symbol}
              <AiOutlineDownCircle className='DownCircle'/>
              </button>
            </span>

            <span>
              <button className={isBuy? 's-sell-btn-d' : 's-sell-btn'} onClick={(e) => setIsBuy(false)}>
              <AiOutlineDownCircle className='DownCircle' />
              Sell {symbol}
              </button>
            </span>

            <hr></hr>

            {!isBuy && (
              <LoadOneAsset marketPrice={marketPrice} />
            )}

            {isBuy && (
              <LoadCash marketPrice={marketPrice} />
            )}
          </div>

          <AddToWatchlistModal />

        </div>

      </div>
    </>
  );
}

export default SingleStock;
