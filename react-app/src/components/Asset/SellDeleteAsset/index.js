import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

import { thunkDeleteOneAsset, thunkSellAsset, thunkGetOneAsset, thunkLoadAllAsset } from '../../../store/assetReducer';


import "./SellDeleteAsset.css"

const SellDeleteAsset = ({ marketPrice, numShares }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { symbol } = useParams();

  useEffect(() => {
    const errors = [];

    if (quantity <= 0) {
      errors.push("Please input valid numbers")
    }
    if (quantity > numShares || numShares == undefined) {
      errors.push("Sorry you don't have so many shares")
    }
    if (quantity == numShares) {
      setIsDelete(true)
    }
    setValidationErrors(errors);
  }, [quantity])

  let handleSubmit

  // console.log('numShares--------------', numShares)
  // console.log(validationErrors)

  if (!!isDelete) {
    handleSubmit = async (e) => {

      e.preventDefault();
      setHasSubmitted(true);

      if (validationErrors.length) { return }

      let deletedAssetPayload = { quantity, symbol }
      deletedAssetPayload.purchased_price = marketPrice
      // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

      dispatch(thunkDeleteOneAsset(deletedAssetPayload))

      setHasSubmitted(true);
      setIsDelete(false)

      setValidationErrors([]);
      setErrors([]);

      window.alert(`Successfully sold ${quantity} shares of ${symbol}`)

      dispatch(thunkLoadAllAsset())

      history.push(`/portfolio`)

    }
  } else {
    handleSubmit = async (e) => {
      e.preventDefault();
      setHasSubmitted(true);

      if (validationErrors.length) { return }

      const editedAssetPayload = { quantity, symbol }
      editedAssetPayload.purchased_price = marketPrice
      // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

      await dispatch(thunkSellAsset(editedAssetPayload))

      setHasSubmitted(true);
      window.alert(`Successfully sold ${quantity} shares of ${symbol}`)
      dispatch(thunkGetOneAsset(symbol))

      dispatch(thunkLoadAllAsset())
      history.push(`/portfolio`)

      setValidationErrors([]);
      setErrors([]);

    }
  }


  return (
    <div className="sell-form-container">
      <form onSubmit={handleSubmit} className="sell-form">

        {hasSubmitted && !!validationErrors.length && (
          <div className='error3-lists'>
            <ul className='error-list'>
              {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
            </ul>
          </div>
        )}


        <div className="sell-input-container">
          <span>Shares</span>
          <span><input type="text"
            className="sell-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          /></span>
        </div>

        <div className="sell-input-container">
          <span>Market Price</span>
          <span>${marketPrice}</span>
        </div>

        <hr></hr>

        <div className="sell-button-div">
          <button className="sell-button"
            onClick={handleSubmit}
            type="submit">sell asset</button>
        </div>
      </form>
      <hr></hr>
    </div>
  );
};

export default SellDeleteAsset;
