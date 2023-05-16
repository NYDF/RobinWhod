import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';
import { fetchfmp } from '../../../utils/helperFunc';
import "./SmallGraph.css"

const SmallGraph = ({ symbol }) => {

  const dispatch = useDispatch();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [marketPrice, setMarketPrice] = useState([]);

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

        setMarketPrice(data[0].close.toFixed(2))
      }
    )).catch(e => { alert(e) })
  }, [dispatch])

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
