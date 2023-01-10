import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

import { thunkEditAsset, thunkLoadCash, thunkGetOneAsset, thunkLoadAllAsset } from '../../../store/assetReducer';
import { thunkAddTransaction } from '../../../store/transactionReducer';

import "./BuyAsset.css"


const BuyAsset = ({ marketPrice, buyingPower }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const { symbol } = useParams();


  useEffect(() => {
    const errors = [];
    if (!(quantity > 0)) {
      errors.push("Please input valid numbers")
    }
    if (quantity * marketPrice > buyingPower) {
      errors.push("Sorry You dont have so much buyingpower")
    }
    setValidationErrors(errors);
  }, [quantity])

  // console.log(validationErrors)
  // console.log(buyingPower)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length) { return }

    const editedAssetPayload = { quantity, symbol }
    editedAssetPayload.purchased_price = marketPrice
    editedAssetPayload.move = 'in'
    // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

    let editedAsset = await dispatch(thunkEditAsset(editedAssetPayload))
    await dispatch(thunkAddTransaction(editedAssetPayload))

    if (!validationErrors.length) {
      setHasSubmitted(true);
      if (editedAsset) {
        dispatch(thunkLoadCash())
        window.alert(`Successfully bought ${quantity} shares of ${symbol}`)
        dispatch(thunkGetOneAsset(symbol))
        dispatch(thunkLoadAllAsset())
        history.push(`/portfolio`)

      }
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="channel-edit-form">

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
              placeholder='0 '
              className="sell-input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            /></span>
        </div>

        <div className="sell-input-container">
          <span>Market Price</span>
          <span>${marketPrice}</span>
        </div>

        <br></br>

        <div className="sell-input-container">
          <span>Estimated Cost</span>
          <span>{(marketPrice*quantity).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span>
        </div>

        <hr></hr>

        <div className="sell-button-div">
          <button className="sell-button"
            onClick={handleSubmit}
            type="submit">buy asset</button>
        </div>
      </form>
      <hr></hr>
    </>
  );
};

export default BuyAsset;
