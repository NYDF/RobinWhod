
const LOAD_ALL_ASSET = 'asset/loadAllasset'
const GET_ONE_ASSET = 'asset/getOneAsset'
const LOAD_CASH_ASSET = 'asset/loadCash'
const ADD_NEW_ASSET = 'asset/addAsset'
const BUY_SELL_ASSET = 'asset/editAsset'
const SELL_ASSET = 'asset/sellAsset'
const SOLD_ALL_ASSET = 'asset/deleteOneAsset'



export const loadAllAsset = (assets) => {
    return {
        type: LOAD_ALL_ASSET,
        assets
    }
}

export const getOneAsset = (asset) => {
    return {
        type: GET_ONE_ASSET,
        asset
    }
}

export const loadCash = (cash) => {
    return {
        type: LOAD_CASH_ASSET,
        cash
    }
}

export const addAsset = (asset) => {
    return {
        type: ADD_NEW_ASSET,
        asset
    };
};

export const editAsset = (asset) => {
    return {
        type: BUY_SELL_ASSET,
        asset
    };
};

export const sellAsset = (asset) => {
    return {
        type: SELL_ASSET,
        asset
    };
};

export const deleteOneAsset = (symbol) => {
    return {
        type: SOLD_ALL_ASSET,
        symbol
    };
};



export const thunkLoadAllAsset = () => async (dispatch) => {

    const response = await fetch(`/api/assets/current`)
    // console.log('herre')
    // console.log('response', response.json())
    if (response.ok) {
        const assets = await response.json();
        // console.log('assets', assets.assets)
        dispatch(loadAllAsset(assets))
        return assets
    }
}


export const thunkGetOneAsset = (symbol) => async (dispatch) => {

    const response = await fetch(`/api/assets/get/${symbol}`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const asset = await response.json();

        dispatch(getOneAsset(asset))
        return asset
    }
}

export const thunkLoadCash = () => async (dispatch) => {

    const response = await fetch(`/api/assets/cash`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const cash = await response.json();
        // console.log("!!!!!!!!cash!!!!!!!!!!", cash)
        dispatch(loadCash(cash))
        return cash
    }
}

export const thunkAddAsset = (data) => async dispatch => {
    const { symbol, quantity, purchased_price } = data
    let is_cash = false

    // console.log('thunk!!!!', symbol, quantity, purchased_price, is_cash)

    const response = await fetch(`/api/assets/new/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, quantity, purchased_price, is_cash }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        // console.log('!!!!!!response', response)
        const newAsset = await response.json();
        // console.log(newAsset)
        dispatch(addAsset(newAsset))

        return newAsset
    }
}


// sell asset
export const thunkSellAsset = (data) => async dispatch => {
    const { quantity, symbol, purchased_price } = data;
    let is_cash = false

    // console.log('hereeee!!!!!!')
    // console.log('data!!!!!!!!!', quantity, symbol, purchased_price )

    const response = await fetch(`/api/assets/sell/${symbol}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            symbol, quantity, purchased_price, is_cash
        }),
    });
    // console.log('response', response)

    if (response.ok) {
        const editedAsset = await response.json();
        // console.log('spot!!!!!!!!!!!!', spot)
        dispatch(sellAsset(editedAsset));
        return editedAsset;
    }
}

// buy asset
export const thunkEditAsset = (data) => async dispatch => {
    const { quantity, symbol, purchased_price } = data;
    let is_cash = false

    // console.log('hereeee!!!!!!')
    // console.log('data!!!!!!!!!', quantity, symbol, purchased_price )

    const response = await fetch(`/api/assets/${symbol}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            symbol, quantity, purchased_price, is_cash
        }),
    });
    // console.log('response', response)

    if (response.ok) {
        const editedAsset = await response.json();
        // console.log('spot!!!!!!!!!!!!', spot)
        dispatch(editAsset(editedAsset));
        return editedAsset;
    }
}

// sell all asset
export const thunkDeleteOneAsset = (data) => async dispatch => {
    // console.log("here=============", symbol)
    const { quantity, symbol, purchased_price } = data;
    let is_cash = false

    const response = await fetch(`/api/assets/sellall/${symbol}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            symbol, quantity, purchased_price, is_cash
        })
    });
    // console.log('response!!!!!!!!!!', response)
    if (response.ok) {
        dispatch(deleteOneAsset(symbol));
    }
}


const assetReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_ASSET:
            const newAssetState = {};
            // console.log("action!!!!!!!!", action)
            action.assets.assets.forEach(asset => {
                newAssetState[asset.id] = asset
            });

            return { ...newAssetState };

        case GET_ONE_ASSET:
            return { ...state, [action.asset.id]: { ...action.asset } }

        case LOAD_CASH_ASSET:
            // console.log("action!!!!!!!!", action)
            return { ...state, ...action.cash }


        case ADD_NEW_ASSET:
            // console.log('!!!action', action.asset)
            return { ...state, [action.asset.id]: { ...action.asset } };

        case BUY_SELL_ASSET:
            console.log('action!!!!!!!!!!!!', action)
            return { ...state, [action.asset.id]: { ...state[action.asset.id], ...action.asset } }

        case SOLD_ALL_ASSET:
            let newState = { ...state }
            // console.log('!!!action', action)
            // console.log('here')
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default assetReducer;
