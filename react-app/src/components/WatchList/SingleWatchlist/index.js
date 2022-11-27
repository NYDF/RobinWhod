import React from 'react';
import { NavLink } from 'react-router-dom';
import SmallGraph from '../../DashBoard/SmallGraph';





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
              <NavLink
              to={`/stocks/${item.symbol}`}
              key={item.id}>
                <>{item.symbol}</>
                <br></br>
                <SmallGraph symbol = {item.symbol} />
                <br></br>
                <hr></hr>
              </NavLink>
            )

          })}
        </div>
    </>
)
};

export default SingleWatchlist;
