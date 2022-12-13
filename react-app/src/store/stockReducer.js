
const LOAD_ALL_STOCKS = 'stocks/loadAllStocks'



export const loadAllStocks = (stocks) => {
    return {
        type: LOAD_ALL_STOCKS,
        stocks
    }
}


export const thunkLoadAllStocks = () => async (dispatch) => {

    const response = await fetch(`/api/stocks`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const stocks = await response.json();

        dispatch(loadAllStocks(stocks))
        return stocks
    }
}



const stockReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_STOCKS:
            const newStocksState = {};
            // console.log("action!!!!!!!!", action.stocks.stocks)
            action.stocks.stocks.forEach(stock => {
                newStocksState[stock.id] = stock
            });
            return { ...newStocksState };

        default:
            return state;
    }
}

export default stockReducer;
