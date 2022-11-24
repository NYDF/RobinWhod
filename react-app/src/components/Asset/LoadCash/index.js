import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { thunkLoadCash } from '../../../store/assetReducer';

import "./LoadCash.css"


const LoadCash = () => {
  const dispatch = useDispatch();

  let currentCash = useSelector(state => state.assetReducer)
  // console.log('currentCash!!!!!!!!!!!!!!', currentCash)


  useEffect(() => {
    dispatch(thunkLoadCash())
  }, [dispatch]);

  if(!currentCash){return null}


  return (
    <>

    <br></br>
      <>Your cash buyingpower:$ {currentCash?.quantity}</>
      <hr></hr>
    </>
  );
};

export default LoadCash;
