
const LOAD_ALL_ASSET = 'asset/loadAllasset'
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



export const thunkLoadAllAsset  = () => async (dispatch) => {

    const response = await fetch(`/api/assets/current`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const assets = await response.json();
        // console.log("!!!!!!!!channel!!!!!!!!!!", channel)
        dispatch(loadAllAsset(assets))
        return assets
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
        // console.log('newChannel!!!!!!', newChannel)
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


// export const thunkDeleteOneAsset = (watchlist_id) => async dispatch => {
//     const response = await fetch(`/api/watchlists/${watchlist_id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     });
//     // console.log('response!!!!!!!!!!', response)
//     if (response.ok) {
//         // const channelToDelete = await response.json();
//         dispatch(deleteOneWatchlist(watchlist_id));
//     }
// }


const assetReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_ASSET:
            const newAssetState = {};
            // console.log("action!!!!!!!!", action)
            action.assets.assets.forEach(asset => {
                newAssetState[asset.id] = asset
            });

            return { ...newAssetState };

        case ADD_NEW_ASSET:
            // console.log('!!!action', action.asset)
            return { ...state, [action.asset.id]: { ...action.asset } };

        case BUY_SELL_ASSET:
            console.log('action!!!!!!!!!!!!', action)
            return { ...state, [action.asset.id]: { ...state[action.asset.id], ...action.asset } }

        // case DELETE_WATCHLIST:
        //     let newState = { ...state }
        //     // console.log('!!!action', action)
        //     // console.log('here')
        //     delete newState[action.id]
        //     return newState

        default:
            return state;
    }
}

export default assetReducer;
