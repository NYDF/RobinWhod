import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import "./GetAllAsset.css"


const GetAllAsset = () => {
  const dispatch = useDispatch();
  // let servers = useSelector(state => state.server.servers)

  // useEffect(() => {
  //     dispatch(getPersonalServers())
  // }, [dispatch]);



  return (
    <>
      <>get all Assets</>
    </>
  );
};

export default GetAllAsset;
