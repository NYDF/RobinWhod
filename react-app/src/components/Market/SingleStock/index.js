
import React from 'react';
import { useDispatch } from 'react-redux';
import AddAsset from '../../Asset/AddAsset';
import BuyAsset from '../../Asset/BuyAsset';
import DeleteAsset from '../../Asset/DeleteAsset';
import LoadCash from '../../Asset/LoadCash';
import LoadOneAsset from '../../Asset/LoadOneAsset';
import SellAsset from '../../Asset/SellAsset';
import SingleStockGraph from '../SingleStockGraph';


import './SingleStock.css'


function SingleStock() {






  return (
    <div className='Single-Stock-page-container'>
      <>
        <SingleStockGraph />
      </>

      <>
        <AddAsset />
      </>

      <>
        <BuyAsset />
      </>

      <>
        <SellAsset />
      </>

      <>
        <DeleteAsset />
      </>

      <>
        <LoadOneAsset />
      </>

      <>
        <LoadCash />
      </>

      <>
        add to list function
      </>
    </div>
  );
}

export default SingleStock;
