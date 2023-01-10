import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkAddAsset, thunkLoadAllAsset, thunkGetOneAsset } from '../../../store/assetReducer';
import { thunkAddTransaction } from '../../../store/transactionReducer';

import "./AddAsset.css"

const AddAsset = ({ marketPrice, buyingPower }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { symbol } = useParams();

  useEffect(() => {
    const errors = [];
    if (!(quantity > 0)) {
      errors.push("Please input valid numbers")
    }
    if (quantity * marketPrice > buyingPower) {
      errors.push("Not enough buyingpower")
    }
    setValidationErrors(errors);
  }, [quantity])

  // console.log("------------------------", validationErrors.length)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (validationErrors.length) { return }

    const assetPayload = { quantity, symbol }
    assetPayload.purchased_price = marketPrice
    assetPayload.move = 'in'

    console.log("!!!!!frontend", assetPayload)

    let createdAsset = await dispatch(thunkAddAsset(assetPayload))
    await dispatch(thunkAddTransaction(assetPayload))

    // setErrors(validationErrors)
    if (!validationErrors.length) {
      setHasSubmitted(true);
      if (createdAsset) {

        // setValidationErrors([]);
        // setErrors([]);

        window.alert(`Successfully bought ${quantity} shares of ${symbol}`)

        // history.push(`/portfolio`)

      }
    }
  }

  return (
    <>
      <form className="create-channel-form" onSubmit={handleSubmit}>

        {hasSubmitted && !!validationErrors.length && (
          <div className='error3-lists'>
            <div className='error-list'>
              {validationErrors.map((error) => <div id='errors' key={error}>{error}</div>)}
            </div>
          </div>
        )}

        <div className="sell-input-container">
          <span>Shares</span>
          <span>
            <input type="number"
              value={quantity}
              placeholder='0 '
              onChange={(e) => setQuantity(e.target.value)}
              className="sell-input"
            /></span>
        </div>

        <div className="sell-input-container">
          <span>Market Price</span>
          <span>${marketPrice}</span>
        </div>

        <br></br>

        <div className="sell-input-container">
          <span >Estimated Cost</span>
          <span>{(marketPrice * quantity).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span>
        </div>

        <hr></hr>

        <div className="sell-button-div">
          <button type="submit"
            className="sell-button"
            onClick={handleSubmit}>buy new</button>
        </div>

      </form>
      <hr></hr>
    </>
  );
};

export default AddAsset;
