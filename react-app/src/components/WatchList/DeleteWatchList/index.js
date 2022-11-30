import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { thunkDeleteOneWatchlist } from '../../../store/watchlistReducer';

import "./DeleteWatchList.css"


const DeleteWatchList = ({ watchlistId }) => {
  const dispatch = useDispatch();
  let watchlist_id = watchlistId
  const history = useHistory();
  // console.log('watchlist_id', watchlist_id)

  const handleDelete = async () => {

    let deletedWatchlistPayload = {watchlist_id}

    dispatch(thunkDeleteOneWatchlist(deletedWatchlistPayload));
    // await dispatch(thunkLoadAllWatchlist())
    history.push(`/portfolio`)
  }


  return (
    <>
      <div className="w-delete-button-div">
        <button type="submit"
        className='w-delete-button'
        onClick={handleDelete}>Delete WatchList</button>
      </div>
    </>
  );
};

export default DeleteWatchList;
