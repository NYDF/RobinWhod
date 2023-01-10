
const LOAD_ALL_STOCKS = 'stocks/loadAllStocks'
const ADD_TO_STOCKS = 'stocks/addOneStock'


export const loadAllStocks = (stocks) => {
    return {
        type: LOAD_ALL_STOCKS,
        stocks
    }
}

export const addOneStock = (stock) => {
    return {
        type: ADD_TO_STOCKS,
        stock
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


export const thunkAddOneStock = (data) => async dispatch => {
    const { symbol } = data

    console.log('thunk!!!!', symbol)

    const response = await fetch(`/api/stocks/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        // console.log('!!!!!!response', response)
        const newStock = await response.json();
        // console.log(newStock)
        dispatch(addOneStock(newStock))

        return newStock
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

            case ADD_TO_STOCKS:
                // console.log('!!!action', action)
                return { ...state, [action.stock.id]: { ...action.stock } };

        default:
            return state;
    }
}

export default stockReducer;
