import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import { thunkAddAsset } from '../../../store/assetReducer';


import "./AddAsset.css"


const AddAsset = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');

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
    setValidationErrors(errors);
  }, [quantity])

  // console.log("------------------------", validationErrors.length)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (validationErrors.length) { return }

    const assetPayload = { quantity, symbol }
    assetPayload.purchased_price = 100

    // console.log("!!!!!frontend", assetPayload)

    let createdAsset = await dispatch(thunkAddAsset(assetPayload))

    setErrors(validationErrors)
    if (!validationErrors.length) {
      setHasSubmitted(true);
      if (createdAsset) {
        // history.push(`/`)
        setValidationErrors([]);
        setErrors([]);

        // console.log(createdChannel)
      }
    }
  }

  return (
    <><form className="create-channel-form" onSubmit={handleSubmit}>


      <div className="c-name-div">

        {hasSubmitted && !!validationErrors.length && (
          <div className='error3-lists'>
            <ul className='error-list'>
              {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
            </ul>
          </div>
        )}
        <div className="c-name-input">

          <input type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="how much you want buy"
          />
        </div>
        <div className="c-create-button">
          <button type="submit" onClick={handleSubmit}>buy new</button>
        </div>
      </div>
    </form></>
  );
};

export default AddAsset;
