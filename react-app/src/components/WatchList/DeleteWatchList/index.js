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

    let deletedWatchlistPayload = { watchlist_id }

    dispatch(thunkDeleteOneWatchlist(deletedWatchlistPayload));
    // await dispatch(thunkLoadAllWatchlist())
    history.push(`/portfolio`)
  }


  return (
    <>
      <div className="w-delete-button-div">
        <div className="delete-wl-btn-word">Are you sure you want to delete this watchlist?</div>
        <div className="delete-wl-btn-word2">This watchlist will be deleted immediately. You can't undo this action.</div>
        <button type="submit"
          className='w-delete-button'
          onClick={handleDelete}>Delete WatchList</button>
      </div>
    </>
  );
};

export default DeleteWatchList;
