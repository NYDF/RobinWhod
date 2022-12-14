import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';

import "./SmallGraph.css"

async function fetchYahooData(symbol) {
  const response = await fetch(
    `https://yahoo-finance-api.vercel.app/${symbol}`
  );
  return response.json();
}

const SmallGraph = ({ symbol }) => {

  const dispatch = useDispatch();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [marketPrice, setMarketPrice] = useState([]);

  useEffect(() => {

    fetchYahooData(symbol).then((
      function (data) {
        // console.log('data------------------', data);

        const x = data.chart?.result[0].timestamp.map(x => new Date(x * 1000))

        const y = data.chart?.result[0].indicators.quote[0].open

        setStockChartXValues(x);
        setStockChartYValues(y);

        setMarketPrice(data.chart?.result[0].meta.regularMarketPrice.toFixed(2))
      }
    ))
    // if(fetchYahooData(symbol)){return () => fetchYahooData?.abort()}
    // return fetchYahooData(symbol)

  }, [dispatch])

  // console.log('stockChartXValues--------------------', stockChartXValues)
  // console.log('stockChartYValues--------------------', stockChartYValues)

  return (
    <div className='asset-bar-second-small-c'>

      <div className='small-plot'>
        <Plot

          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              mode: 'lines',
              marker: { color: '#C3F53C' },
            }
          ]}
          config={{
            displayModeBar: false,
          }}
          layout={{
            width: 65, height: 20,
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
      </div>

      <div className='third-column'>
        ${marketPrice}
      </div>

    </div>

  )

};

export default SmallGraph;
