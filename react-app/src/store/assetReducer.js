
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


// export const thunkAddAsset = (data) => async dispatch => {
//     const { symbol, ticker_name, owner_id, quantity, purchased_price } = data

//     // console.log('thunk!!!!', name)

//     const response = await fetch(`/api/watchlists/new`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name }),
//     })
//     // console.log('!!!!!!response', response)
//     if (response.ok) {
//         // console.log('!!!!!!response', response)
//         const newWatchlist = await response.json();
//         // console.log(newWatchlist)
//         dispatch(addWatchlist(newWatchlist))
//         // console.log('newChannel!!!!!!', newChannel)
//         return newWatchlist
//     }
// }



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
        case LOAD_ALL_WATCHLIST:
            const newWatchlistState = {};
            // console.log("action!!!!!!!!", action.watchlists.watchlists)
            action.watchlists.watchlists.forEach(watchlist => {
                newWatchlistState[watchlist.id] = watchlist
            });
            return { ...newWatchlistState };



        // case ADD_ONE_WATCHLIST:
        //     // console.log('!!!action', action)
        //     return { ...state, [action.watchlist.id]: { ...action.watchlist } };

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
