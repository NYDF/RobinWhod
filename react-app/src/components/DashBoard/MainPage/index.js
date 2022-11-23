
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
      <>
        <PortfolioGraph />
      </>

      <>
        <GetAllAsset />

        <AddWatchlist />

        <GetWatchlist />

      </>
    </div>
  );
}

export default MainPage;
