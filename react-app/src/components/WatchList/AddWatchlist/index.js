import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import lightning from '../../../img/lightning.png'
import { thunkAddWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';

import "./AddWatchlist.css"


const AddWatchlist = () => {

  const dispatch = useDispatch();
  const [showAddWatchlist, setShowAddWatchlist] = useState(false);
  const [name, setName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);

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
    let createdWatchlist = dispatch(thunkAddWatchlist(watchlistPayload)).catch(async (res) => {
      const data = await res.json();
      console.log(data)
      if (data && data.errors) setErrors(data.errors)
    });



    if (!validationErrors.length) {
      setHasSubmitted(true);
      if (createdWatchlist) {

        await dispatch(thunkLoadAllWatchlist())
        setValidationErrors([]);
        setErrors([]);
      }
    }
  }

  return (
    <div className='add-watchlist-container'>

      <div className='add-watchlist-title-div'>
        <span><img id='lightning-img' src={lightning} />Lists</span>
        <button
          className="add-watchlist-button"
          onClick={() => {
            showAddWatchlist == false ? setShowAddWatchlist(true) : setShowAddWatchlist(false);
          }}>
          +</button>
      </div>

      {showAddWatchlist && (<form className="create-channel-form" onSubmit={handleSubmit}>

        {hasSubmitted && !!validationErrors.length && (

          <div className='error-list'>
            {validationErrors.map((error) => <div id='errors' key={error}>{error}</div>)}

          </div>
        )}

        <div>
        <input type="text"
          value={name}
          className='add-list-input'
          onChange={(e) => setName(e.target.value)}
          placeholder="  List Name"
        />

        <div className="create-watchlist-button-container">
          <button type="submit" className="create-watchlist-button" onClick={handleSubmit}>Create New Watchlist</button>
        </div>

        </div>

      </form>)}
    </div>
  );
};

export default AddWatchlist;
