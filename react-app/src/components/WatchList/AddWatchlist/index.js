import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { thunkAddWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';

import "./AddWatchlist.css"


const AddWatchlist = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();


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

  // console.log("------------------------", name)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (validationErrors.length) { return }

    const watchlistPayload = { name }

    // console.log("!!!!!frontend", watchlistPayload)
    let createdWatchlist = await dispatch(thunkAddWatchlist(watchlistPayload))

    setErrors(validationErrors)
    if (!validationErrors.length) {
      setHasSubmitted(true);
      if (createdWatchlist) {
        // history.push(`/`)
        setValidationErrors([]);
        setErrors([]);

        dispatch(thunkLoadAllWatchlist())
        // console.log(createdChannel)
      }
    }
  }

  return (
    <>
      <>add new watch list here</>
      <form className="create-channel-form" onSubmit={handleSubmit}>

          {hasSubmitted && !!validationErrors.length && (
            <div className='error3-lists'>
              <ul className='error-list'>
                {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
              </ul>
            </div>
          )}
          <div className="c-name-input">
            <span className="small-logo">
              <i className="fa-light fa-hashtag"> </i>
            </span>
            <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="new-channel"
            />
          </div>

          <div className="c-create-button">
            <button type="submit" onClick={handleSubmit}>Create Channel</button>
          </div>


      </form>
    </>
  );
};

export default AddWatchlist;
