import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { thunkLoadAllWatchlist } from '../../../store/watchlistReducer';


import SingleWatchlist from '../SingleWatchlist';
import "./GetWatchlist.css"



const GetWatchlist = () => {
  const dispatch = useDispatch();
  const [showEditWatchlist, setShowEditWatchlist] = useState(false);

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
                <SingleWatchlist watchlist={watchlist} key={watchlist?.id}
                  showEditWatchlist={showEditWatchlist} setShowEditWatchlist={setShowEditWatchlist} />
              </div>

              {/*
              <>
                <UpdateWatchList watchlistId={watchlist.id} key={watchlist?.id}
                  showEditWatchlist={showEditWatchlist} setShowEditWatchlist={setShowEditWatchlist}
                />
              </>

              <>
                <DeleteWatchList watchlistId={watchlist.id} key={watchlist?.id}
                  showEditWatchlist={showEditWatchlist} setShowEditWatchlist={setShowEditWatchlist} />
              </> */}

            </div>
          )

        })}
      </div>


    </div>

  );
};

export default GetWatchlist;
