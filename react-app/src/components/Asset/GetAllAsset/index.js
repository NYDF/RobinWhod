import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { thunkLoadAllAsset } from '../../../store/assetReducer';

import "./GetAllAsset.css"


const GetAllAsset = () => {
  const dispatch = useDispatch();
  let allAsset = useSelector(state => state.assetReducer)
  // console.log('allAsset!!!!!!!!!!!!!!', allAsset)

  useEffect(() => {
      dispatch(thunkLoadAllAsset())
  }, [dispatch]);



  return (
    <>
      <>{}</>
    </>
  );
};

export default GetAllAsset;
