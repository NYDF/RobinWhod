import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkEditWatchlist } from '../../../store/watchlistReducer';


import "./UpdateWatchList.css"
import DeleteWatchList from '../DeleteWatchList';


const UpdateWatchList = () => {

  const { watchlistId } = useParams();
  console.log(watchlistId)

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  // const watchlist = useSelector(state => state.watchlistReducer)
  // console.log('!!!!!watchlist', watchlist)

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
    else {

      const editedWatchlistPayload = { name }
      editedWatchlistPayload.watchlistId = watchlistId
      // console.log('!!!!!name', editedWatchlistPayload.name, editedWatchlistPayload.watchlistId)
      let editedWatchlist = dispatch(thunkEditWatchlist(editedWatchlistPayload))
      history.push(`/portfolio`)
    }
  }


  return (
    <div className='edit-watchlist-page-container'>
      <form onSubmit={handleSubmit}
        className='edit-watchlist-form' >

        {hasSubmitted && !!validationErrors.length && (
          <div className='error3-lists'>
            <ul className='error-list'>
              {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
            </ul>
          </div>
        )}

        <div className="input-content">
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="editedChannel-button">
          <button className="e-c-button"
            onClick={handleSubmit}
            type="submit">Save Changes</button>
        </div>

      </form>

      <DeleteWatchList watchlistId={watchlistId} />
    </div>
  );
};

export default UpdateWatchList;
