
import React from 'react';
import { useDispatch } from 'react-redux';



import GetAllAsset from '../../Asset/GetAllAsset';
import AddWatchlist from '../../WatchList/AddWatchlist';
import GetWatchlist from '../../WatchList/GetWatchlist';
import PortfolioGraph from '../PortfolioGraph';
import './MainPage.css'


function MainPage() {






  return (
    <div className='Main-page-container'>
      <div className='Main-page-left'>
        <PortfolioGraph />
      </div>

      <div className='Main-page-right'>
        <GetAllAsset />

        <AddWatchlist />

        <GetWatchlist />

      </div>
    </div>
  );
}

export default MainPage;
