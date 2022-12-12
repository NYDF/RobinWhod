import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkRemoveFromWatchlist } from '../../../store/watchlistReducer';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';

import "./EditItemInWatchlist.css"



const EditItemInWatchlist = ({ item, watchlistId }) => {
  const dispatch = useDispatch();






  const handleDeleteItem = async (e) => {
    let deletedItemPayload = { watchlistId }
    deletedItemPayload.symbol = item.symbol

    dispatch(thunkRemoveFromWatchlist(deletedItemPayload));


  }


  return (<>
    <div className='item-single-line-container'>

      <span className='item-single-line-left'>{item.symbol.toUpperCase()}</span>
      <button className="Delete-item-from-watchlist"
        onClick={handleDeleteItem}
        type="submit">X</button>

    </div>
    <hr></hr>
    </>
  );
};

export default EditItemInWatchlist;
