import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { thunkAddToWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';
import { stockInWL } from '../../../utils/helperFunc';

import "./AddToWatchlist.css"


const AddToWatchlistForm = ({ setShowModal, symbol }) => {

  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlistReducer)
  const watchlistArr = Object.values(watchlists)
  // console.log('watchlistArr============', watchlistArr)

  const [watchlistId, setWatchlistId] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");

  // console.log('----------', watchlistName)

  useEffect(() => {
    dispatch(thunkLoadAllWatchlist())
  }, [dispatch]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const stockAddToWatchlistPayload = { watchlistId, symbol }

    let addedWatchList = await dispatch(thunkAddToWatchlist(stockAddToWatchlistPayload))

    if (addedWatchList) {
      dispatch(thunkLoadAllWatchlist())
      await setShowModal(false);
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} >
        {watchlistArr.map((item) => {
          <div></div>
          return (
            <div key={item.id} >
              <input type="radio" name="align"
                disabled={stockInWL(item, symbol)? true : false}
                onChange={() => setWatchlistId(item.id)}
                value={item.id} />
              <div>{item.name}</div>
            </div>
          )
        })}

        <div className="editedChannel-button">
          <button className="e-c-button"
            onClick={handleSubmit}
            type="submit">Add to watchlist</button>
        </div>

      </form>
    </>
  );
};

export default AddToWatchlistForm;
