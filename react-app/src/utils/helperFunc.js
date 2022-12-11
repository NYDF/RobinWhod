
export function stockInWL(item, symbol) {
	let symbolList = item.item_in_list

	for (let i = 0; i < symbolList?.length; i++) {
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



export function symbolInWl(arr, symbol){
    let resultArr = []
    for(let i=0; i<arr.length; i++){
        resultArr = resultArr.concat(arr[i].item_in_list)
    }
    let sum = 0
    for(let j=0; j<resultArr.length; j++){

        if(resultArr[j].symbol == symbol){
            sum+=1
        }
    }

    return sum
}



export function numberFormatter(str){
    const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	  });

	  return formatter.format(str)
}
