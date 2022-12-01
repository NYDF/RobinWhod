
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



import GetAllAsset from '../../Asset/GetAllAsset';
import AddWatchlist from '../../WatchList/AddWatchlist';
import GetWatchlist from '../../WatchList/GetWatchlist';
import PortfolioGraph from '../PortfolioGraph';
import PortfolioNavBar from '../PortfolioNavBar';

import { thunkLoadAllAsset } from '../../../store/assetReducer';


import './MainPage.css'


function MainPage() {

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  // let allAsset = useSelector(state => state.assetReducer)
  // console.log('allAsset!!!!!!!!!!!!!!', allAsset)
  // let allAssetArr = Object.values(allAsset)
  // console.log('allAsset!!!!!!!!!!!!!!', allAssetArr)
  // const portfolio = calculatePortfolio(allAsset)

  // const cash = sessionUser?.assets.filter(x => x.symbol == '$')[0]?.quantity

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
    </>
  );
}

export default MainPage;
