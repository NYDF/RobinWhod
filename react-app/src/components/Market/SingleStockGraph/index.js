import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';

import "./SingleStockGraph.css"

async function fetchAlphavantageData(symbol) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey='TRV0RSAYZ07TFGYR'`
  );
  return response.json();
}

async function fetchCompanyData(symbol) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey='TRV0RSAYZ07TFGYR'`
  );
  return response.json();
}

async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://yahoo-finance-api.vercel.app/${symbol}`
  );
  return response.json();
}

const SingleStockGraph = ({marketPrice, setMarketPrice}) => {
  const { symbol } = useParams();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [industry, setIndustry] = useState();
  const [yearhigh, setYearhigh] = useState();
  const [yearlow, setYearlow] = useState();

  // console.log('symbol', symbol)
  // console.log(typeof symbol)

  useEffect(() => {
    const x = [];
    const y = [];

    fetchAlphavantageData(symbol).then((
      function (data) {
        // console.log('data------------------', data);

        for (let key in data['Time Series (Daily)']) {
          x.push(key);
          y.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(x);
        setStockChartYValues(y);
      }
    )).catch(e => { alert(e) })
  }, [])


  useEffect(() => {

    fetchCompanyData(symbol).then((
      function (data) {
        // console.log('data------------------', data);

        setName(data.Name)
        setDescription(data.Description)
        setIndustry(data.Industry)
        setYearhigh(data['52WeekHigh'])
        setYearlow(data['52WeekLow'])
      }
    )).catch(e => { alert(e) })
  }, [])

  useEffect(() => {

    fetchYahooData(symbol).then((
      function (data) {
        // console.log('data------------------', data);
        setMarketPrice(data.chart.result[0].meta.regularMarketPrice.toFixed(2))
      }
    )).catch(e => { alert(e) })
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <>${marketPrice}</>
      <br></br>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            // type: 'scatter',
            mode: 'lines',
            marker: { color: 'green' },
          }
        ]}
        layout={{ width: 720, height: 440 }}
      />
      <br></br>
      <>About</>
      <br></br>
      <>{description}</>
      <br></br>
      <>{industry}</>
      <br></br>
      <>52weekhigh</>
      <>{yearhigh}</>
      <br></br>
      <>52weeklow</>
      <>{yearlow}</>
    </div>
  )

};

export default SingleStockGraph;
