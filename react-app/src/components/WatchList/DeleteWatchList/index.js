import React from 'react';
import { useDispatch } from 'react-redux';


import { thunkDeleteOneWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';

import "./DeleteWatchList.css"


const DeleteWatchList = ({ watchlistId, showEditWatchlist, setShowEditWatchlist }) => {
  const dispatch = useDispatch();
  let watchlist_id = watchlistId
  // console.log('watchlist_id', watchlist_id)

  const handleDelete = async () => {

    dispatch(thunkDeleteOneWatchlist(watchlist_id));
    // await dispatch(thunkLoadAllWatchlist())

  }


  return (
    <>
      {showEditWatchlist && (<div className="c-delete-button">
        <button type="submit" onClick={handleDelete}>Delete WatchList</button>
      </div>)}
    </>
  );
};

export default DeleteWatchList;
