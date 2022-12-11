import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';


import { thunkLoadCash, thunkLoadAllAsset } from '../../../store/assetReducer';
import "./PortfolioGraph.css"
import { getEachStockCurrentPrice } from '../../../utils/helperFunc';
import CompanyNewsMol from '../../Market/CompanyNewsMol';


async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://yahoo-finance-api.vercel.app/${symbol}`
  );
  return response.json();
}

var ultimateColors = [
  ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
  ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
  ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
  ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
];

const PortfolioGraph = () => {
  const dispatch = useDispatch();
  const [chartXValues, setChartXValues] = useState([]);
  const [chartYValues, setChartYValues] = useState([]);
  const [quantityValues, setQuantityValues] = useState([]);
  const [totalAssetCash, setTotalAssetCash] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  let allAsset = useSelector(state => state.assetReducer)
  let allAssetArr = Object.values(allAsset)
  const cash = allAssetArr?.filter(x => x.symbol == '$')[0]?.quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  const ownedStock = allAssetArr?.filter(x => x.symbol !== '$')[0]?.quantity.toFixed(2)

  // console.log('+++++++++++++++++++++++', ownedStock)

  useEffect(() => {
    dispatch(thunkLoadCash())
  }, [dispatch])


  useEffect(() => {
    dispatch(thunkLoadAllAsset()).then(res => {
      let assetArrr = res.assets

      const stockOwned = {}
      assetArrr?.forEach(
        (stock) => (stockOwned[stock.symbol] = stock.quantity)
      );
      // console.log('stockOwned', stockOwned )

      getEachStockCurrentPrice(stockOwned).then((
        function (data) {
          // console.log('data------------------', data);
          let x = data
          let y = Object.keys(stockOwned)
          let z = Object.values(stockOwned)
          // console.log('x!!!!!!!!!!!!!!!', x)
          // console.log('y!!!!!!!!!!!!!!!', y)
          // console.log('z!!!!!!!!!!!!!!!', z)



          let sum
          if (x.length) {
            sum = Number(x.reduce((a, e) => Number(a) + Number(e)))
          }
          else { sum = 0 }
          // console.log('sum!!!!!!!!!!!!!!!', sum)

          setChartXValues(x)
          setChartYValues(y)
          setQuantityValues(z)
          setTotalAssetCash((sum).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }))
        }
      ))
    }

    )
  }, [dispatch]);



  // console.log('cash!!!!!!!!!!!!!!!', cash)


  if (!allAsset) { return null }
  if (!cash) {
    return null
  }

  if (!ownedStock) {
    return (
      <div className='main-page-left-container'>
        <div className='main-page-number'>Portfolio: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {totalAssetCash}</div>
        <div className='main-page-number'>BuyingPower: &nbsp;&nbsp; {cash}
          <hr></hr>
        </div>
        <div className='main-page-only-cash-word'>You haven't buy any stocks yet</div>
        <div className='pei-chart-container'>
          <span className='pie-chart-2'>
            <Plot
              data={[
                {
                  values: [cash],
                  labels: 'cash',
                  type: "pie",
                  textinfo: "label+percent",
                }
              ]}
              config={{
                displayModeBar: false,
              }}
              layout={{
                title: "Portfolio Propotion",
                width: 320, height: 400,
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
                  l: 20,
                  r: 0,
                  b: 20,
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
                  values: [cash],
                  labels: 'cash',
                  type: "pie",
                  hole: .3,
                  textinfo: "label+percent",
                  marker: {
                    colors: ultimateColors[1]
                  },
                }
              ]}
              config={{
                displayModeBar: false,
              }}
              layout={{
                title: "Quantity Propotion",
                width: 320, height: 400,
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
                  l: 20,
                  r: 0,
                  b: 20,
                  t: 25,

                },
                showlegend: false
              }} />
          </span>
        </div>
        <br></br>
        <CompanyNewsMol symbol={'aapl'} />
      </div>
    )
  }

  else {
    return (
      <div className='main-page-left-container'>
        <div className='main-page-number'>Portfolio: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {totalAssetCash}</div>
        <div className='main-page-number'>BuyingPower:  &nbsp;&nbsp; {cash}
          <hr></hr>
        </div>

        <div className='pei-chart-container'>
          <span className='pie-chart-2'>
            <Plot
              data={[
                {
                  values: chartXValues,
                  labels: chartYValues,
                  type: "pie",
                  textinfo: "label+percent",
                }
              ]}
              config={{
                displayModeBar: false,
              }}
              layout={{
                title: "Portfolio Propotion",
                width: 320, height: 400,
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
                  l: 20,
                  r: 0,
                  b: 20,
                  t: 25,

                },
                showlegend: false
              }}
            />
          </span>

          <span className='bar-chart'>

            <Plot

              data={[
                {
                  y: quantityValues,
                  x: chartYValues,
                  type: "bar",
                  marker:{
                    color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                  },
                }
              ]}
              layout={{
                title: "Quantity Propotion",
                width: 400, height: 380,
                autosize: false,
                "xaxis": {
                  fixedrange: true
                },
                "yaxis": {
                  fixedrange: true
                },
                margin: {
                  l: 50,
                  r: 0,
                  b: 40,
                  t: 25,

                },
                showlegend: false
              }}
               />




          </span>
        </div>
        <br></br>
        <CompanyNewsMol symbol={'aapl'} />

      </div>
    );
  }
};

export default PortfolioGraph;
