
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';


// import './SingleList.css'

// async function fetchCompanyData(symbol) {
//   const response = await fetch(
//     `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey='TRV0RSAYZ07TFGYR'`
//   );
//   return response.json();
// }

// function SingleList({symbol}) {
//   const [AnalystTargetPrice, setAnalystTargetPrice] = useState();
//   const [BookValue, setBookValue] = useState();
//   const [Name, setName] = useState();
//   const [EPS, setEPS] = useState();
//   const [ProfitMargin, setProfitMargin] = useState();

//   useEffect(() => {

//     fetchCompanyData(symbol).then((
//       function (data) {
//         // console.log('data------------------', data);

//         setName(data.Name)
//         setAnalystTargetPrice(data.AnalystTargetPrice)
//         setBookValue(data.BookValue)
//         setEPS(data.EPS)
//         setProfitMargin(data.ProfitMargin)
//       }
//     ))
//   }, [])

//   return (
//     <div className='all-stock-title-container'>
//       <span className='each-column'>{Name}</span>
//       <span className='each-column'>{symbol}</span>
//       <span className='each-column'>{EPS}</span>
//       <span className='each-column'>$ {AnalystTargetPrice}</span>
//       <span className='each-column'>{BookValue}</span>

//     </div>
//   );
// }

// export default SingleList;
