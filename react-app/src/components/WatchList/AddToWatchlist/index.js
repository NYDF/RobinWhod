import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddToWatchlistForm from './AddToWatchlistForm';

import "./AddToWatchlist.css"


const AddToWatchlistModal = () => {

  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }

  const { symbol } = useParams();
  if (!sessionUser) { return null }

  return (

    <div className='add-to-watchlist-div' >

      <button id="add-to-watchlist-button" onClick={closetable} > Add to watchlist </button>

      {showModal && (
        <div onClick={closetable}>
          <AddToWatchlistForm setShowModal={setShowModal} symbol={symbol} />
        </div>
      )}
    </div>
  );
};

export default AddToWatchlistModal;
