
export function stockInWL(item, symbol) {
	let symbolList = item.item_in_list

	for (let i = 0; i < symbolList?.length; i++) {
		if (symbolList[i].symbol === symbol) {
			return true
		}
	}
	return false
}

export async function fetchfmp(symbol) {
	const response = await fetch(
		`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=a2793842a87b442a51e3b15c5dfaf162`
	);
	return response.json();
}

export async function fetchCompanyData(symbol) {
	const response = await fetch(
		`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey='TRV0RSAYZ07TFGYR'`
	);
	return response.json();
}

export async function fetchAlphavantageData(symbol) {
	const response = await fetch(
		`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey='TRV0RSAYZ07TFGYR'`
	);
	return response.json();
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
	try {
		const response = await fetch(
			`https://yahoo-finance-api.vercel.app/${ticker}`
		);
		return response.json()
	} catch (e) {
		return "api failed"
	}
}


export async function getEachStockCurrentPrice(portfolio) {
	const ownedStock = Object.keys(portfolio);
	const ownedStockQuantity = Object.values(portfolio)

	let ownedStockData = await Promise.all(
		ownedStock.map(async (ticker) => await fetchfmp(ticker))
	);

	ownedStockData.map(x=>x.slice(0,100))
	// console.log('ownedStockData', ownedStockData)
	// console.log('ownedStockQuantity', ownedStockQuantity)
	const portfolioArr = [];

	for (let i=0;i<ownedStockData.length;i++){
		let price = Number(ownedStockData[i][0].open)
		let quantity = Number(ownedStockQuantity[i])
		portfolioArr.push(price*quantity)
	}
	// console.log('portfolioArr', portfolioArr)
	return portfolioArr;
}


export function symbolInWl(arr, symbol) {
	let resultArr = []
	for (let i = 0; i < arr.length; i++) {
		resultArr = resultArr.concat(arr[i].item_in_list)
	}
	let sum = 0
	for (let j = 0; j < resultArr.length; j++) {

		if (resultArr[j].symbol === symbol) {
			sum += 1
		}
	}

	return sum
}



export function numberFormatter(str) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	return formatter.format(str)
}
