import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { thunkEditWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';
import { sameName } from '../../../utils/helperFunc';

import "./UpdateWatchList.css"


const UpdateWatchList = ({ watchlistId }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const watchlist = useSelector(state => state.watchlistReducer)
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

    const editedWatchlistPayload = { name }
    editedWatchlistPayload.watchlistId = watchlistId
    // console.log('!!!!!name', editedWatchlistPayload.name, editedWatchlistPayload.watchlistId)
    let editedWatchlist = await dispatch(thunkEditWatchlist(editedWatchlistPayload))

    if (editedWatchlist) {dispatch(thunkLoadAllWatchlist())}
  }


  return (
    <>
      <form onSubmit={handleSubmit} >

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
    </>
  );
};

export default UpdateWatchList;
