import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UpdateWatchList from '../UpdateWatchList';

import { thunkLoadAllWatchlist } from '../../../store/watchlistReducer';


import SingleWatchlist from '../SingleWatchlist';
import "./GetWatchlist.css"
import DeleteWatchList from '../DeleteWatchList';


const GetWatchlist = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkLoadAllWatchlist())
  }, [dispatch]);

  const watchlist = useSelector(state => state.watchlistReducer)
  const watchlistArr = Object.values(watchlist)

  // console.log('watchlist!!!!!!!!', watchlist)
  // console.log('watchlistArr!!!!!!!!', watchlistArr)

  return (

      <div className="single-watchlist-container">
        <div className="single-watchlist">
          {watchlistArr.map((watchlist) => {
            return (
              <div className='single-watchlist' key={watchlist.id}>
              <div>
              <SingleWatchlist watchlist={watchlist} key={watchlist?.id} />
              </div>
              <>
              <UpdateWatchList watchlistId={watchlist.id} key={watchlist?.id} />
              </>
              <>
              <DeleteWatchList watchlistId={watchlist.id} key={watchlist?.id} />
              </>
              </div>
            )

          })}
        </div>


      </div>

  );
};

export default GetWatchlist;
