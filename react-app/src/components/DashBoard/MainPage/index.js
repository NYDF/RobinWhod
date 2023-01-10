
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



import GetAllAsset from '../../Asset/GetAllAsset';
import AddWatchlist from '../../WatchList/AddWatchlist';
import GetWatchlist from '../../WatchList/GetWatchlist';
import PortfolioGraph from '../PortfolioGraph';
import PortfolioNavBar from '../PortfolioNavBar';

import { thunkLoadAllAsset } from '../../../store/assetReducer';


import './MainPage.css'
import Footer from '../../Footer';


function MainPage() {

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }
  const dispatch = useDispatch();

  useEffect(() => { dispatch(thunkLoadAllAsset()) }, [dispatch]);

  return (
    <>
      <PortfolioNavBar showModal={showModal} setShowModal={setShowModal} closetable={closetable} />
      <div className='Main-page-container' onClick={() => setShowModal(false)}>

        <div className='Main-page-left' >
          <PortfolioGraph />
        </div>

        <div className='Main-page-right' >
          <GetAllAsset />
          <hr></hr>
          <AddWatchlist />
          <hr></hr>
          <GetWatchlist />

        </div>

      </div>
      <Footer />
    </>
  );
}

export default MainPage;
