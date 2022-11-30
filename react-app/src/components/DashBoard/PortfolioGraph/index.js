import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';


import { loadCash, thunkLoadAllAsset } from '../../../store/assetReducer';
import "./PortfolioGraph.css"
import { getEachStockCurrentPrice } from '../../../utils/helperFunc';


async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://yahoo-finance-api.vercel.app/${symbol}`
  );
  return response.json();
}

const PortfolioGraph = () => {
  const dispatch = useDispatch();
  const [chartXValues, setChartXValues] = useState([]);
  const [chartYValues, setChartYValues] = useState([]);
  const [quantityValues, setQuantityValues] = useState([]);

  const [totalAssetCash, setTotalAssetCash] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  let allAsset = useSelector(state => state.assetReducer)
  // let allAssetArr = Object.values(allAsset)

  // console.log('allAssetArr', allAssetArr)

  // console.log('stockOwned', stockOwned )
  const cash = sessionUser?.assets.filter(x => x.symbol == '$')[0]?.quantity

  useEffect(() => {
    dispatch(loadCash())
    dispatch(thunkLoadAllAsset()).then(res => {
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
          console.log('x!!!!!!!!!!!!!!!', x)
          console.log('y!!!!!!!!!!!!!!!', y)
          console.log('z!!!!!!!!!!!!!!!', z)


          const sum = Number(x.reduce((a, e) => Number(a) + Number(e)))
          // console.log('sum!!!!!!!!!!!!!!!', sum)
          setChartXValues(x)
          setChartYValues(y)
          setQuantityValues(z)
          setTotalAssetCash((sum + cash).toFixed(2))
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

  if (!allAsset) { return null }


  return (
    <div className='main-page-left-container'>
      <div className='main-page-number'>${totalAssetCash}</div>

      <div className='pei-chart-container'>
        <span className='pie-chart-2'>
          <Plot
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
              title: "Portfolio Propotion",
              width: 300, height: 400,
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
                t: 25,

              },
              showlegend: false
            }}
          />
        </span>

        <span className='pie-chart-2'>
          <Plot

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
              title: "Quantity Propotion",
              width: 300, height: 400,
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
                t: 25,

              },
              showlegend: false
            }} />
        </span>
      </div>

    </div>
  );
};

export default PortfolioGraph;
