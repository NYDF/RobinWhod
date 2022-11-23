
const LOAD_ALL_ASSET = 'asset/loadAllasset'
const ADD_NEW_ASSET = 'asset/addAsset'
const BUY_SELL_ASSET = 'asset/editAsset'
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
    console.log('!!!!!!response', response)
    if (response.ok) {
        // console.log('!!!!!!response', response)
        const newAsset = await response.json();
        // console.log(newAsset)
        dispatch(addAsset(newAsset))
        // console.log('newChannel!!!!!!', newChannel)
        return newAsset
    }
}



// export const thunkEditAsset = (data) => async dispatch => {
//     const { name, watchlistId } = data;


//     console.log('data!!!!!!!!!', name, watchlistId )
//     let watchlist_id = watchlistId

//     const response = await fetch(`/api/watchlists/${watchlist_id}`, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name
//         }),
//     });
//     // console.log('response', response)

//     if (response.ok) {
//         const editedWatchlist = await response.json();
//         // console.log('spot!!!!!!!!!!!!', spot)
//         dispatch(editWatchlist(editedWatchlist));
//         return editedWatchlist;
//     }
// }


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
            console.log("action!!!!!!!!", action)
            action.assets.assets.forEach(asset => {
                newAssetState[asset.id] = asset
            });

            return { ...newAssetState };



        case ADD_NEW_ASSET:
            console.log('!!!action', action)
            // return { ...state, [action.watchlist.id]: { ...action.watchlist } };

        // case EDIT_WATCHLIST:
        //     // console.log('action!!!!!!!!!!!!', action.spot)
        //     return { ...state, [action.watchlist.id]: { ...state[action.watchlist.id], ...action.watchlist } }

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
