import React from 'react';
import { useDispatch } from 'react-redux';

import { thunkRemoveFromWatchlist } from '../../../store/watchlistReducer';

import "./EditItemInWatchlist.css"

const EditItemInWatchlist = ({ item, watchlistId }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = async (e) => {
    let deletedItemPayload = { watchlistId }
    deletedItemPayload.symbol = item.symbol

    dispatch(thunkRemoveFromWatchlist(deletedItemPayload));

  }

  return (
    <>
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
