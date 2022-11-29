import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';


import { thunkLoadAllAsset } from '../../../store/assetReducer';
import "./PortfolioGraph.css"
import { getEachStockCurrentPrice } from '../../../utils/helperFunc';


async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://yahoo-finance-api.vercel.app/${symbol}`
  );
  return response.json();
}

const PortfolioGraph = ({ cash, portfolio }) => {
  const dispatch = useDispatch();
  const [chartXValues, setChartXValues] = useState([]);
  const [chartYValues, setChartYValues] = useState([]);
  const [quantityValues, setQuantityValues] = useState([]);

  const [marketPrice, setMarketPrice] = useState([]);

  let allAsset = useSelector(state => state.assetReducer)
  let allAssetArr = Object.values(allAsset)

  // console.log('allAssetArr', allAssetArr)

  // console.log('allAssetArr', allAssetArr )

  // console.log('stockOwned', stockOwned )
  useEffect(() => {
    dispatch(thunkLoadAllAsset()).then( res => {
      let assetArrr = res.assets

      const stockOwned = {}
      assetArrr.forEach(
        (stock) => (stockOwned[stock.symbol] = stock.quantity)
      );
        // console.log('stockOwned', stockOwned )

        getEachStockCurrentPrice(stockOwned).then((
        function (data) {
          // console.log('data------------------', data);
          let x = data
          let y = Object.keys(stockOwned)
          let z = Object.values(stockOwned)
          // console.log('x!!!!!!!!!!!!!!!',x )
          setChartXValues(x)
          setChartYValues(y)
          setQuantityValues(z)
        }
      ))
    }

    )
  }, [dispatch]);

  // console.log('stockOwned', stockOwned )


  // useEffect(() => {

  //   const stockOwned = {}
  //   allAssetArr.forEach(
  //     (stock) => (stockOwned[stock.symbol] = stock.quantity)
  //   );
  //     // console.log('stockOwned', stockOwned )

  //     getEachStockCurrentPrice(stockOwned).then((
  //     function (data) {
  //       // console.log('data------------------', data);
  //       let x = data
  //       let y = Object.keys(stockOwned)
  //       let z = Object.values(stockOwned)
  //       // console.log('x!!!!!!!!!!!!!!!',x )
  //       setChartXValues(x)
  //       setChartYValues(y)
  //       setQuantityValues(z)
  //     }
  //   ))

  // }, [dispatch])

  if(!allAsset){return null}


  return (
    <div className='asset-c'>
      {portfolio} {cash}
      <>
      <Plot
        className='big-plot'
        data={[
          {
            values: chartXValues,
            labels: chartYValues,
            type: "pie",
          }
        ]}
        config={{
          displayModeBar: false,
        }}
        layout={{
          width: 650, height: 200,
          autosize: false,
          "xaxis": {
            "visible": false,
            fixedrange: true
          },
          "yaxis": {
            "visible": false,
            fixedrange: true
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          },
          showlegend: false
        }}
        />
</>
<>
<Plot
        className='big-plot'
        data={[
          {
            values: quantityValues,
            labels: chartYValues,
            type: "pie",
          }
        ]}
        config={{
          displayModeBar: false,
        }}
        layout={{
          width: 650, height: 200,
          autosize: false,
          "xaxis": {
            "visible": false,
            fixedrange: true
          },
          "yaxis": {
            "visible": false,
            fixedrange: true
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          },
          showlegend: false
        }} />

</>

    </div>
  );
};

export default PortfolioGraph;
