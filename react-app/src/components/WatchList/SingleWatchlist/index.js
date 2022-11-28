import React from 'react';
import { NavLink } from 'react-router-dom';
import SmallGraph from '../../DashBoard/SmallGraph';





import "./SingleWatchlist.css"


const SingleWatchlist = ({ watchlist }) => {


  if (!watchlist) { return null }

  return (
    <div className='watchlist-container'>


      <div className='watchlist-name'>{watchlist?.name}</div>
      {watchlist?.item_in_list?.map((item) => {
        <div></div>
        return (
          <NavLink
            to={`/stocks/${item.symbol}`}
            key={item.id}>
            <div className="single-asset-container">
              <div className="single-asset-first-column">{item.symbol}</div>

              <SmallGraph symbol={item.symbol} />
            </div>
          </NavLink>
        )

      })}

    </div>
  )
};

export default SingleWatchlist;
