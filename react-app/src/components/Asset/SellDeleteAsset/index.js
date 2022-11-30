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
    if (quantity > numShares || numShares==undefined ) {
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

      const deletedAssetPayload = { quantity, symbol }
      deletedAssetPayload.purchased_price = marketPrice
      // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

      let deletedAsset = await dispatch(thunkDeleteOneAsset(deletedAssetPayload))

        setHasSubmitted(true);
        if (deletedAsset) {
          // dispatch(thunkGetOneAsset(symbol))
          // dispatch(thunkLoadAllAsset())
          // setValidationErrors([]);
          // setErrors([]);
          window.alert(`Successfully sold ${quantity} shares of ${symbol}`)
          setIsDelete(false)
          history.push(`/portfolio`)
      }

    }
  } else {
    handleSubmit = async (e) => {
      e.preventDefault();
      setHasSubmitted(true);

      if (validationErrors.length) { return }

      const editedAssetPayload = { quantity, symbol }
      editedAssetPayload.purchased_price = marketPrice
      // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

      let editedAsset = await dispatch(thunkSellAsset(editedAssetPayload))

      if (!validationErrors.length) {
        setHasSubmitted(true);
        if (editedAsset) {
          history.push(`/portfolio`)
          await dispatch(thunkGetOneAsset(symbol))
          window.alert(`Successfully sold ${quantity} shares of ${symbol}`)
          setValidationErrors([]);
          setErrors([]);
        }
      }
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
