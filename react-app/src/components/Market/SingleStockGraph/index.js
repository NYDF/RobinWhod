import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
// import Chart from 'react-apexcharts';

import "./SingleStockGraph.css"

async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey='TRV0RSAYZ07TFGYR'`
  );
  return response.json();
}


const SingleStockGraph = () => {
  const { symbol } = useParams();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  // console.log('symbol', symbol)
  // console.log(typeof symbol)

  useEffect(() => {
    const x = [];
    const y = [];

    fetchYahooData(symbol).then((
      function (data) {
        console.log('data------------------', data);

        for (let key in data['Time Series (Daily)']) {
          x.push(key);
          y.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(x);
        setStockChartYValues(y);
      }
    )).catch(e => { alert(e) })
  }, [])

  return (
    <div>
        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines',
              marker: {color: 'green'},
            }
          ]}
          layout={{width: 720, height: 440}}
        />
      </div>
  )

};

export default SingleStockGraph;
