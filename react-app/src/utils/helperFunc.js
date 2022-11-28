
export function stockInWL(item, symbol) {
		let symbolList = item.item_in_list

		for (let i=0; i<symbolList.length; i++){
			if (symbolList[i].symbol==symbol){
				return true
			}
		}
		return false
}
