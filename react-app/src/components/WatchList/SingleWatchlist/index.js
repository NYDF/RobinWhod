import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';





import "./SingleWatchlist.css"


const SingleWatchlist = ({watchlist}) => {


  if (!watchlist) { return null }

  return (
    <>

        <div>
            <>watchlistName: {watchlist?.name}</>
            {watchlist?.item_in_list?.map((item) => {
            <div></div>
            return (
              <div key={item.id}>
                <>{item.symbol}</>
                <br></br>
                <br></br>
                <hr></hr>
              </div>
            )

          })}
        </div>
    </>
)
};

export default SingleWatchlist;
