import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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

  // if (!channelsArr) { return null }

  return (
    <>
      <>get all watch lists</>

      <>map each watch list then edit and delete </>
      <div className="single-watchlist-container">
        <div className="single-watchlist">
          {watchlistArr.map((watchlist) => {
            return (
              <>
              <SingleWatchlist watchlist={watchlist} key={watchlist.id} />
              <UpdateWatchList id={watchlist.id} key={watchlist.id+100} />
              <DeleteWatchList id={watchlist.id} key={watchlist.id+1000} />
              </>
            )

          })}
        </div>


      </div>
    </>
  );
};

export default GetWatchlist;
