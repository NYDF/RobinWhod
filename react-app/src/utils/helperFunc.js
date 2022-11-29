
export function stockInWL(item, symbol) {
		let symbolList = item.item_in_list

		for (let i=0; i<symbolList.length; i++){
			if (symbolList[i].symbol==symbol){
				return true
			}
		}
		return false
}


export function calculatePortfolio(obj) {
	let sum = 0
	let arr = Object.values(obj)
	for (let i=0; i<arr.length; i++){
		sum += arr[i].quantity * arr[i]['purchased_price']
	}
	return sum
}


export function sameName(obj, newWLname) {

	let arr = Object.values(obj)

	for (let i=0; i<arr.length; i++){
		if (arr[i].name == newWLname) {
			return true
		}
	}
	return false
}
