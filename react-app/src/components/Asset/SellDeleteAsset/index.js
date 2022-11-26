import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";

import { thunkDeleteOneAsset, thunkSellAsset, thunkGetOneAsset } from '../../../store/assetReducer';

import "./SellDeleteAsset.css"


const SellDeleteAsset = ({ marketPrice, numShares }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const { symbol } = useParams();

  useEffect(() => {
    const errors = [];
    if (quantity <= 0) {
      errors.push("Please input valid numbers")
    }
    if (quantity > numShares) {
      errors.push("Sorry you don't have so many shares")
    }
    if (quantity  == numShares) {
      setIsDelete(true)
    }
    setValidationErrors(errors);
  }, [quantity])

  let handleSubmit


  if(!!isDelete){
    handleSubmit = async () => {

    await dispatch(thunkDeleteOneAsset(symbol));
    setIsDelete(false)
      await  dispatch(thunkGetOneAsset(symbol))

  }} else {
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
          // history.push(`/`)
          await  dispatch(thunkGetOneAsset(symbol))
          setValidationErrors([]);
          setErrors([]);
        }
      }
    }
  }



  return (
   <>
      <form onSubmit={handleSubmit} className="channel-edit-form">

                    {hasSubmitted && !!validationErrors.length && (
                        <div className='error3-lists'>
                            <ul className='error-list'>
                                {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
                            </ul>
                        </div>
                    )}

                    <div className="input-content-1">
                        <input type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <div>
                      <span>Market Price</span>
                      <span>${marketPrice}</span>
                    </div>

                    <div className="editedChannel-button">
                        <button className="e-c-button"
                            onClick={handleSubmit}
                            type="submit">sell asset</button>
                    </div>
                </form>
    </>
  );
};

export default SellDeleteAsset;
