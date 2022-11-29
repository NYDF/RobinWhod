import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import "./PortfolioGraph.css"


const PortfolioGraph = () => {


  return (
   <>
   <>if I can do the graph!</>
   </>
  );
};

export default PortfolioGraph;



// async function getStonk(ticker) {
// 	const response = await fetch(
// 		`https://yahoo-finance-api.vercel.app/${ticker}`
// 	);
// 	return response.json();
// }

// export async function getPortfolioPerformancedifference(portfolio) {
// 	const ownedStock = Object.keys(portfolio);

// 	const ownedStockData = await Promise.all(
// 		ownedStock.map(async (ticker) => await getStonk(ticker))
// 	);

// 	const dataLength = ownedStockData[0].chart.result[0].timestamp;
// 	const TradingPeriodStartTime =
// 		ownedStockData[0].chart.result[0].meta.tradingPeriods[0][0].start;
// 	const TradingPeriodEndTime =
// 		ownedStockData[0].chart.result[0].meta.tradingPeriods[0][0].end;
// 	const portfolioArr = [];
// 	for (let i = 0; i <= dataLength.length - 1; i++) {
// 		let PortfolioTotal = null;
// 		ownedStockData.forEach((stock) => {
// 			const key = stock.chart.result[0].meta.symbol;
// 			const price =
// 				stock.chart.result[0].indicators.quote[0].open[i] * portfolio[key];
// 			if (price == 0 || isNaN(price)) {
// 				PortfolioTotal = 0;
// 			} else if (PortfolioTotal != 0) PortfolioTotal += price;
// 		});
// 		portfolioArr[i] = PortfolioTotal;
// 	}
// 	return {
// 		portfolioArr,
// 		dataLength,
// 		TradingPeriodStartTime,
// 		TradingPeriodEndTime
// 	};
// }
