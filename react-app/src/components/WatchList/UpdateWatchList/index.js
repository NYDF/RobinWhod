import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkEditWatchlist, thunkLoadOneWatchlist } from '../../../store/watchlistReducer';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';
import EditItemInWatchlist from '../EditItemInWatchlist';
import DeleteWatchList from '../DeleteWatchList';

import "./UpdateWatchList.css"
import GetWatchlist from '../GetWatchlist';


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
  const itemsInWatchlist = watchlist?.item_in_list

  // console.log("&&&&&&&&&&&&&&",watchlist)
  // console.log("&&&&&&&&&&&&&&", itemsInWatchlist)

  useEffect(() => {
    dispatch(thunkLoadOneWatchlist(watchlistId))
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

  if (!watchlist) { return null }
  if (!itemsInWatchlist) { return null }


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
      <div className='edit-watchlist-page-title'>Watchlist Name: {watchlist?.name}</div>

      <div className='edit-watchlist-page-container'>

        <div className='edit-watchlist-page-left'>
          <form onSubmit={handleSubmit}
            className='edit-watchlist-form' >

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

          {itemsInWatchlist && (

            <div className='Items-in-watchlist-container'>

              {itemsInWatchlist.map((item) =>
                <EditItemInWatchlist key={item.symbol} item={item} watchlistId={watchlistId} />
              )}

            </div>
          )}

          <DeleteWatchList watchlistId={watchlistId} />
        </div>

        <div className='edit-watchlist-page-right'>
          <GetWatchlist />
        </div>

      </div>




    </>
  );
};

export default UpdateWatchList;
