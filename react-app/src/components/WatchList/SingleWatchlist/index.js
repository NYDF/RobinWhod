import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SmallGraph from '../../DashBoard/SmallGraph';





import "./SingleWatchlist.css"


const SingleWatchlist = ({ watchlist, showEditWatchlist, setShowEditWatchlist }) => {
  const [showWatchlistitems, setShowWatchlistitems] = useState(false);


  if (!watchlist) { return null }

  return (
    <div className='watchlist-container'>

      <div className='watchlist-title-icon-container' >
        <span className='watchlist-name'>{watchlist?.name}</span>

        <span>
          <button
            className="Edit-watchlist-modal-btn"
            onClick={() => {
              showEditWatchlist == false ? setShowEditWatchlist(true) : setShowEditWatchlist(false);
            }}>
            •••</button>

          <button
            className="Expand-watchlist-button"
            onClick={() => {
              showWatchlistitems == false ? setShowWatchlistitems(true) : setShowWatchlistitems(false);
            }}>
            {showWatchlistitems == false ? (<div className='add-watchlist-button'>+</div>) : (<div className='add-watchlist-button'>-</div>)}</button>
        </span>
      </div>

      <div>
        {showWatchlistitems && (<>
          {watchlist?.item_in_list?.map((item) => {

            return (
              <NavLink
                to={`/stocks/${item.symbol}`}
                key={item.id}>

                <div className="single-asset-container">
                  <div className="single-asset-first-column">{item.symbol}</div>

                  <><SmallGraph symbol={item.symbol} /></>
                </div>
              </NavLink>
            )

          })}
        </>)}
      </div>
    </div>
  )
};

export default SingleWatchlist;
