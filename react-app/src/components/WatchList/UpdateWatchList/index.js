import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkEditWatchlist, thunkLoadAllWatchlist } from '../../../store/watchlistReducer';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';

import "./UpdateWatchList.css"
import DeleteWatchList from '../DeleteWatchList';


const UpdateWatchList = () => {


  const { watchlistId } = useParams();
  // console.log(watchlistId)

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  // console.log('!!!!!watchlist', watchlist)

  const watchlist = useSelector(state => state.watchlistReducer)[watchlistId]


  // console.log("&&&&&&&&&&&&&&",watchlist)

  useEffect(() => {
    dispatch(thunkLoadAllWatchlist())
  }, [dispatch]);

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

  if(!watchlist){return null}


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
    <>
      <PortfolioNavBar />
      <div className='edit-watchlist-page-container'>
        <form onSubmit={handleSubmit}
          className='edit-watchlist-form' >

          <div className='edit-watchlist-page-title'>Watchlist Name: {watchlist?.name}</div>

          {hasSubmitted && !!validationErrors.length && (
            <div className='error3-lists'>
              <ul className='error-list'>
                {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
              </ul>
            </div>
          )}

          <div className="eidt-watchlist-input-container">
            <input type="text"
              value={name}
              className="eidt-watchlist-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="edited-watchlist-button-div">
            <button className="e-w-button"
              onClick={handleSubmit}
              type="submit">Save Changes</button>
              <hr></hr>
          </div>

        </form>

        <DeleteWatchList watchlistId={watchlistId} />
      </div>
    </>
  );
};

export default UpdateWatchList;
