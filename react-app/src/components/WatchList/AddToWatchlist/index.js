import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { thunkEditWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';


import "./AddToWatchlist.css"


const AddToWatchlist = ({ watchlistId }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  // console.log('!!!!!id', id)

  useEffect(() => {
    const errors = [];
    if (!name.length) {
      errors.push("Name is required ")
    }
    if (name.length > 50) {
      errors.push("Name should be less than 50 characters")
    }
    if (name.length < 2) {
      errors.push("Name should be more than 2 characters")
    }
    setValidationErrors(errors);
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length) { return }

    const editedWatchlistPayload = { name }
    editedWatchlistPayload.watchlistId = watchlistId

    let editedWatchlist = await dispatch(thunkEditWatchlist(editedWatchlistPayload))

    if (editedWatchlist) { dispatch(thunkLoadAllWatchlist()) }
  }


  return (
    <>
      <form onSubmit={handleSubmit} >

        <div className="editedChannel-button">
          <button className="e-c-button"
            onClick={handleSubmit}
            type="submit">Add to watchlist</button>
        </div>

      </form>
    </>
  );
};

export default AddToWatchlist;
