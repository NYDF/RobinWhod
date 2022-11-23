import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { thunkEditWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';


import "./UpdateWatchList.css"


const UpdateWatchList = ({ id }) => {

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
    editedWatchlistPayload.watchlistId = id
    console.log('!!!!!name', editedWatchlistPayload.name, editedWatchlistPayload.watchlistId)
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
