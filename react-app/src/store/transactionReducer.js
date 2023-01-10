
const LOAD_ALL_TRANSACTIONS = 'transaction/loadAllTransactions'
const LOAD_ONE_TRANSACTION = 'transaction/loadOneTransaction'
const CREATE_ONE_TRANSACTION = 'transaction/addTransaction'
const DELETE_TRANSACTION = 'transaction/deleteOneTransaction'



export const loadAllTransactions = (transactions) => {
    return {
        type: LOAD_ALL_TRANSACTIONS,
        transactions
    }
}

export const loadOneTransaction = (transaction) => {
    return {
        type: LOAD_ONE_TRANSACTION,
        transaction
    }
}

export const addTransaction = (transaction) => {
    return {
        type: CREATE_ONE_TRANSACTION,
        transaction
    };
};

export const deleteOneTransaction = (id) => {
    return {
        type: DELETE_TRANSACTION,
        id
    };
};



export const thunkLoadAllTransactions = () => async (dispatch) => {

    const response = await fetch(`/api/transactions/current`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const transactions = await response.json();

        dispatch(loadAllTransactions(transactions))
        return transactions
    }
}

export const thunkLoadOneTransaction = (transactionId) => async (dispatch) => {

    const response = await fetch(`/api/transactions/${transactionId}`)
    // console.log('herre')
    // console.log('response', response)
    if (response.ok) {
        const singleTransaction = await response.json();

        dispatch(loadOneTransaction(singleTransaction))
        return singleTransaction
    }
}

export const thunkAddTransaction = (data) => async dispatch => {
    const { symbol, quantity, purchased_price, move } = data

    console.log('thunk!!!!', symbol, quantity, purchased_price, move)

    const response = await fetch(`/api/transactions/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, quantity, purchased_price, move }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        const newTransaction = await response.json();
        // console.log(newTransaction)
        dispatch(addTransaction(newTransaction))

        return newTransaction
    }
}


export const thunkDeleteOneTransaction = ({transaction_id}) => async dispatch => {
    // console.log('transaction_id!!!!!!!!!!', transaction_id)
    const response = await fetch(`/api/transactions/${transaction_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    // console.log('transaction_id!!!!!!!!!!', transaction_id)
    if (response.ok) {
        dispatch(deleteOneTransaction(transaction_id));
    }
}


const transactionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_TRANSACTIONS:
            const newTransactionState = {};
            // console.log("action!!!!!!!!", action)
            action.transactions.transactions.forEach(transaction => {
                newTransactionState[transaction.id] = transaction
            });
            return { ...newTransactionState };

        case LOAD_ONE_TRANSACTION:
            // console.log("action!!!!!!!!", action)
            let transactionState = { ...state }
            // console.log("!!!!!!!!",action.spot)
            transactionState[action.transaction.id] = action.transaction
            // console.log("!!!!!!!!", spotState)
            return transactionState

        case CREATE_ONE_TRANSACTION:
            // console.log('!!!action', action)
            return { ...state, [action.transaction.id]: { ...action.transaction } };

        case DELETE_TRANSACTION:
            let newState = { ...state }
            // console.log('!!!action', action)
            // console.log('here')
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default transactionReducer;
