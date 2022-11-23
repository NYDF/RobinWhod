import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { thunkDeleteOneWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';

import "./DeleteWatchList.css"


const DeleteWatchList = ({ id }) => {
  const dispatch = useDispatch();
  let watchlist_id = id
  // console.log('watchlist_id', watchlist_id)

  const handleDelete = async () => {

    dispatch(thunkDeleteOneWatchlist(watchlist_id));
    // await dispatch(thunkLoadAllWatchlist())

  }


  return (
    <>
      <div className="c-delete-button">
        <button type="submit" onClick={handleDelete}>Delete Channel</button>
      </div>
    </>
  );
};

export default DeleteWatchList;
