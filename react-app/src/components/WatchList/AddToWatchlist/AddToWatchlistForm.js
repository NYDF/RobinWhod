import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { thunkAddToWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';
import { stockInWL, symbolInWl } from '../../../utils/helperFunc';

import bulbimg from '../../../img/bulb.png'
import "./AddToWatchlist.css"


const AddToWatchlistForm = ({ setShowModal, symbol }) => {

  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlistReducer)
  const watchlistArr = Object.values(watchlists)
  const [showDiv, setShowDiv] = useState(false);

  // console.log('watchlistArr============', watchlistArr)

  const [watchlistId, setWatchlistId] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");

  // console.log('----------', watchlistName)

  useEffect(() => {
    dispatch(thunkLoadAllWatchlist())
  }, [dispatch]);

  // console.log('watchlistArr.length***********', watchlistArr.length)
  // console.log(showDiv)

  const handleSubmit = async (e) => {

    if (!watchlistArr.length) {
      setShowDiv(true)
    }

    e.preventDefault();
    setHasSubmitted(true);

    const stockAddToWatchlistPayload = { watchlistId, symbol }

    let addedWatchList = await dispatch(thunkAddToWatchlist(stockAddToWatchlistPayload))

    if (addedWatchList) {
      dispatch(thunkLoadAllWatchlist())
      await setShowModal(false);
    }
  }

  if (watchlistArr?.length && symbolInWl(watchlistArr, symbol) == watchlistArr.length) {
    return (
      <div className='watchlist-add-to-container'>
        
        <form onSubmit={handleSubmit} >
          {watchlistArr.map((item) => {

            return (
              <div key={item.id} >
                <span className='add-to-wl-input'></span><input type="radio" name="align"
                  disabled={stockInWL(item, symbol) ? true : false}
                  onChange={() => setWatchlistId(item.id)}
                  value={item.id} />
                <span className='add-to-wl-name'>
                  <img id='bulb-img' src={bulbimg} />
                  {item.name}</span>

              </div>
            )
          })}

          <button className="add-wl-button-disabled"
            onClick={handleSubmit}
            disabled
            type="submit">Choose watchlist</button>

        </form>
      </div>
    );
  } else if (watchlistArr?.length && symbolInWl(watchlistArr, symbol) !== watchlistArr.length) {
    return (
      <div className='watchlist-add-to-container'>

        <form onSubmit={handleSubmit} >
          {watchlistArr.map((item) => {

            return (
              <div key={item.id} >
                <span className='add-to-wl-input'></span><input type="radio" name="align"
                  disabled={stockInWL(item, symbol) ? true : false}
                  onChange={() => setWatchlistId(item.id)}
                  value={item.id} />
                <span className='add-to-wl-name'>
                  <img id='bulb-img' src={bulbimg} />
                  {item.name}</span>

              </div>
            )
          })}

          <button className="add-wl-button"
            onClick={handleSubmit}
            type="submit">Choose watchlist</button>

        </form>
      </div>
    )
  }

  else {
    return (
      <div className='no-watchlist-word'>You haven't create watchlist yet</div>
    )
  }
}

export default AddToWatchlistForm;
