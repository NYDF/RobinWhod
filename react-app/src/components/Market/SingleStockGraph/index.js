import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';

import "./SingleStockGraph.css"
import CompanyNewsMol from '../CompanyNewsMol';
import { fetchfmp, fetchCompanyData } from '../../../utils/helperFunc';


const SingleStockGraph = ({ marketPrice, setMarketPrice }) => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [industry, setIndustry] = useState();
  const [yearhigh, setYearhigh] = useState();
  const [yearlow, setYearlow] = useState();
  const [priceDifference, setPriceDifference] = useState();
  const [percentDifference, setPercentDifference] = useState();

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
    ))
  }, [])

  useEffect(() => {

    fetchfmp(symbol).then((
      function (data) {

        const x = data.map(x => x.date).slice(0, 100)

        const y = data.map(x => x.open).slice(0, 100)

        // console.log(x, y);
        const difference = (data[0].close - data[data.length - 1].close).toFixed(2)

        const percent = (difference / (data[0].close) * 100).toFixed(2)

        setStockChartXValues(x);
        setStockChartYValues(y);

        setPriceDifference(difference)
        setPercentDifference(percent)
        setMarketPrice(data[0].close.toFixed(2))
      }
    )).catch(e => { alert(e) })
  }, [dispatch])

  // console.log('stockChartXValues--------------------', stockChartXValues)
  // console.log('stockChartYValues--------------------', stockChartYValues)

  return (
    <div className='single-stock-left-container'>
      <div className='single-stock-left-name'>{name}</div>
      <div className='single-stock-left-number'>${marketPrice}</div>
      <div className='single-stock-left-number-small'>${priceDifference} ({percentDifference}%)</div>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            // type: 'scatter',
            mode: 'lines',
            marker: { color: '#C3F53C' },
          }
        ]}
        layout={{
          width: 800, height: 325,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },

          "yaxis": {
            "visible": false
          }
        }}
        config={{ displayModeBar: false, }}
      />

      <div className='single-stock-left-company-title'>About</div>

      <div className='single-stock-left-company-description'>{description}</div>

      <div className='single-stock-left-company-title'>Key statistics</div>

      <div className='single-stock-stat-container'>
        <div className='single-stock-stat-small-container'>
          <div className='single-stock-stat-up'>52 week high</div>

          <div className='single-stock-stat-down'>{yearhigh}</div>
        </div>

        <div className='single-stock-stat-small-container'>
          <div className='single-stock-stat-up'>52 week low</div>

          <div className='single-stock-stat-down'>{yearlow}</div>
        </div>
      </div>

      <CompanyNewsMol symbol={symbol} />
    </div>
  )

};

export default SingleStockGraph;
