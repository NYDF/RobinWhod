
export function stockInWL(item, symbol) {
	let symbolList = item.item_in_list

	for (let i = 0; i < symbolList.length; i++) {
		if (symbolList[i].symbol == symbol) {
			return true
		}
	}
	return false
}



export function calculatePortfolio(obj) {
	let sum = 0
	let arr = Object.values(obj)
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i].quantity * arr[i]['purchased_price']
	}
	return sum
}


async function getYahooData(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	return response.json();
}

export async function getEachStockCurrentPrice(portfolio) {
	const ownedStock = Object.keys(portfolio);
	const ownedStockQuantity = Object.values(portfolio)

	const ownedStockData = await Promise.all(
		ownedStock.map(async (ticker) => await getYahooData(ticker))
	);

	const portfolioArr = [];
	for (let i = 0; i < ownedStock.length; i++) {


		let price = Number(ownedStockData[i].chart?.result[0].meta.regularMarketPrice.toFixed(2));
		let quantity = Number(ownedStockQuantity[i])
		portfolioArr.push((price * quantity).toFixed(2))


	}
	return portfolioArr;
}
