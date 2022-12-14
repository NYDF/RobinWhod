import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";

import { thunkDeleteOneAsset } from '../../../store/assetReducer';

import "./DeleteAsset.css"


const DeleteAsset = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  // console.log('symbol!!!!!!!!!!!!!!!!', symbol)
  const handleDelete = async () => {

    dispatch(thunkDeleteOneAsset(symbol));
    // await dispatch(thunkLoadAllWatchlist())
  }


  return (
    <>
      <div className="c-delete-button">
        <button type="submit" onClick={handleDelete}>Delete Channel</button>
      </div>
    </>
  );
};

export default DeleteAsset;
