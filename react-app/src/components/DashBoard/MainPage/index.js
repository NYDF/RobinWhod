
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



import GetAllAsset from '../../Asset/GetAllAsset';
import AddWatchlist from '../../WatchList/AddWatchlist';
import GetWatchlist from '../../WatchList/GetWatchlist';
import PortfolioGraph from '../PortfolioGraph';
import PortfolioNavBar from '../PortfolioNavBar';

import { thunkLoadAllAsset } from '../../../store/assetReducer';
import { calculatePortfolio } from '../../../utils/helperFunc';

import './MainPage.css'


function MainPage() {

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let allAsset = useSelector(state => state.assetReducer)
  // console.log('allAsset!!!!!!!!!!!!!!', allAsset)
  let allAssetArr = Object.values(allAsset)
  // console.log('allAsset!!!!!!!!!!!!!!', allAssetArr)
  const portfolio = calculatePortfolio(allAsset)

  const cash = sessionUser?.assets.filter(x => x.symbol == '$')[0]?.quantity


  useEffect(() => { dispatch(thunkLoadAllAsset()) }, [dispatch]);



  return (
    <>
      <PortfolioNavBar showModal={showModal} setShowModal={setShowModal} closetable={closetable} />
      <div className='Main-page-container' onClick={() => setShowModal(false)}>

        <div className='Main-page-left' >
          <PortfolioGraph allAssetArr={allAssetArr} cash={cash} portfolio={portfolio} />
        </div>

        <div className='Main-page-right' >
          <GetAllAsset />

          <AddWatchlist />

          <GetWatchlist />

        </div>
      </div>
    </>
  );
}

export default MainPage;
