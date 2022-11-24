
import React from 'react';
import { useDispatch } from 'react-redux';
import AddAsset from '../../Asset/AddAsset';
import BuyAsset from '../../Asset/BuyAsset';
import DeleteAsset from '../../Asset/DeleteAsset';
import SellAsset from '../../Asset/SellAsset';


import './SingleStock.css'


function SingleStock() {






  return (
    <div className='Single-Stock-page-container'>
      <>
        single stock graph
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
        add to list function
      </>
    </div>
  );
}

export default SingleStock;
