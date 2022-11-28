import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Modal } from '../../../context/Modal';
import AddToWatchlistForm from './AddToWatchlistForm';

import "./AddToWatchlist.css"


const AddToWatchlistModal = () => {

  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const { symbol } = useParams();
  if (!sessionUser) {
    return null;
}

  return (
    <>
    <div className='add-to-watchlist-modal' >
        <div className='add to watchlist-div'onClick={() => setShowModal(true)}>
            <button id="show-modal-button"> Add to watchlist </button>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <AddToWatchlistForm setShowModal={setShowModal} symbol={symbol} />
            </Modal>
        )}
    </div>
</>
  );
};

export default AddToWatchlistModal;
