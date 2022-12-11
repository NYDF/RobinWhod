
const LOAD_ALL_WATCHLIST = 'watchlist/loadAllWatchlist'
const LOAD_ONE_WATCHLIST = 'watchlist/loadOneWatchlist'
const ADD_ONE_WATCHLIST = 'watchlist/addWatchlist'
const EDIT_WATCHLIST = 'watchlist/editWatchlist'
const DELETE_WATCHLIST = 'watchlist/deleteOneWatchlist'
const ADD_TO_WATCHLIST = 'watchlist/addtoWatchlist'
const REMOVE_FROM_WATCHLIST = 'watchlist/addtoWatchlist'


export const loadAllWatchlist = (watchlists) => {
    return {
        type: LOAD_ALL_WATCHLIST,
        watchlists
    }
}

export const loadOneWatchlist = (watchlist) => {
    return {
        type: LOAD_ONE_WATCHLIST,
        watchlist
    }
}

export const addWatchlist = (watchlist) => {
    return {
        type: ADD_ONE_WATCHLIST,
        watchlist
    };
};

export const editWatchlist = (watchlist) => {
    return {
        type: EDIT_WATCHLIST,
        watchlist
    };
};

export const deleteOneWatchlist = (id) => {
    return {
        type: DELETE_WATCHLIST,
        id
    };
};

export const addToWatchlist = (watchlist) => {
    return {
        type: ADD_TO_WATCHLIST,
        watchlist
    };
};

export const removeFromWatchlist = (watchlist) => {
    return {
        type: REMOVE_FROM_WATCHLIST,
        watchlist
    };
};


export const thunkLoadAllWatchlist = () => async (dispatch) => {

    const response = await fetch(`/api/watchlists/current`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const watchlists = await response.json();

        dispatch(loadAllWatchlist(watchlists))
        return watchlists
    }
}

export const thunkLoadOneWatchlist = (watchlistId) => async (dispatch) => {

    const response = await fetch(`/api/watchlists/${watchlistId}`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const watchlist = await response.json();

        dispatch(loadOneWatchlist(watchlist))
        return watchlist
    }
}

export const thunkAddWatchlist = (data) => async dispatch => {
    const { name } = data

    // console.log('thunk!!!!', name)

    const response = await fetch(`/api/watchlists/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        // console.log('!!!!!!response', response)
        const newWatchlist = await response.json();
        // console.log(newWatchlist)
        dispatch(addWatchlist(newWatchlist))

        return newWatchlist
    }
}


export const thunkDeleteOneWatchlist = ({ watchlist_id }) => async dispatch => {
    console.log('watchlist_id!!!!!!!!!!', watchlist_id)
    const response = await fetch(`/api/watchlists/${watchlist_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log('watchlist_id!!!!!!!!!!', watchlist_id)
    if (response.ok) {
        dispatch(deleteOneWatchlist(watchlist_id));
    }
}


export const thunkEditWatchlist = (data) => async dispatch => {
    const { name, watchlistId } = data;

    // console.log('data!!!!!!!!!', name, watchlistId )
    let watchlist_id = Number(watchlistId)

    const response = await fetch(`/api/watchlists/${watchlist_id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    // console.log('response', response)

    if (response.ok) {
        const editedWatchlist = await response.json();
        // console.log('spot!!!!!!!!!!!!', spot)
        dispatch(editWatchlist(editedWatchlist));
        return editedWatchlist;
    }
}


export const thunkAddToWatchlist = (data) => async dispatch => {
    const { watchlistId, symbol } = data;


    // console.log('data!!!!!!!!!', symbol, watchlistName )
    let watchlist_id = watchlistId

    const response = await fetch(`/api/watchlists/add_item/${watchlist_id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
    });
    // console.log('response', response)

    if (response.ok) {
        const addStockToWatchlist = await response.json();
        // console.log('addStockToWatchlist!!!!!!!!!!!!', addStockToWatchlist)
        dispatch(addToWatchlist(addStockToWatchlist));
        return addStockToWatchlist;
    }
}


export const thunkRemoveFromWatchlist = (data) => async dispatch => {
    const { watchlistId, symbol } = data;


    // console.log('data!!!!!!!!!', symbol, watchlistName )
    let watchlist_id = watchlistId

    const response = await fetch(`/api/watchlists/remove_item/${watchlist_id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
    });
    // console.log('response', response)

    if (response.ok) {
        const removeStockFromWatchlist = await response.json();
        // console.log('removeStockFromWatchlist!!!!!!!!!!!!', removeStockFromWatchlist)
        dispatch(removeFromWatchlist(removeStockFromWatchlist));
        return removeStockFromWatchlist;
    }
}



const watchlistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_WATCHLIST:
            const newWatchlistState = {};
            // console.log("action!!!!!!!!", action.watchlists.watchlists)
            action.watchlists.watchlists.forEach(watchlist => {
                newWatchlistState[watchlist.id] = watchlist
            });
            return { ...newWatchlistState };

        case LOAD_ONE_WATCHLIST:
            // console.log("action!!!!!!!!", action)
            let watchlistState = { ...state }
            // console.log("!!!!!!!!",action.spot)
            watchlistState[action.watchlist.id] = action.watchlist
            // console.log("!!!!!!!!", spotState)
            return watchlistState

        case ADD_ONE_WATCHLIST:
            // console.log('!!!action', action)
            return { ...state, [action.watchlist.id]: { ...action.watchlist } };

        case EDIT_WATCHLIST:
            // console.log('action!!!!!!!!!!!!', action.spot)
            return { ...state, [action.watchlist.id]: { ...state[action.watchlist.id], ...action.watchlist } }

        case DELETE_WATCHLIST:
            let newState = { ...state }
            // console.log('!!!action', action)
            // console.log('here')
            delete newState[action.id]
            return newState

        case ADD_TO_WATCHLIST:
            // console.log('action!!!!!!!!!!!!', action.spot)
            return { ...state, [action.watchlist.id]: { ...state[action.watchlist.id], ...action.watchlist } }

        case REMOVE_FROM_WATCHLIST:
            // console.log('action!!!!!!!!!!!!', action.spot)
            // return { ...state, [action.watchlist.id]: { ...state[action.watchlist.id], ...action.watchlist } }

        default:
            return state;
    }
}

export default watchlistReducer;
