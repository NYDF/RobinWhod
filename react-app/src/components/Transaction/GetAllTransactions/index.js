import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadAllTransactions } from '../../../store/transactionReducer';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';

import { numberFormatter } from '../../../utils/helperFunc';

import "./GetAllTransactions.css"

const GetAllTransactions = () => {
  const dispatch = useDispatch();
  let allTransactions = useSelector(state => state.transactionReducer)
  let user = useSelector(state => state.session.user)
  // console.log('allTransactions!!!!!!!!!!!!!!', allTransactions)
  let allTransactionArr = Object.values(allTransactions).reverse().filter(x => x.symbol != '$')

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }

  useEffect(() => {
    dispatch(thunkLoadAllTransactions())
  }, [dispatch]);

  if (!allTransactions) { return null }

  return (
    <>
      <PortfolioNavBar showModal={showModal} setShowModal={setShowModal} closetable={closetable} />

      <div className='All-transaction-container' onClick={() => setShowModal(false)}>
        <h1>{user.username}</h1>
        <hr></hr>
        <h2>Completed Transactions</h2>
        <hr></hr>
        {allTransactionArr.map((transaction) => {
          return (
            <>
              <div className='single-transaction-container' key={transaction.id}>
                <div className='single-transaction-left'>
                  <div className='single-transaction-symbol'>
                    {transaction.symbol.toUpperCase()}  {transaction.move == 'in' ? 'Buy' : 'Sell'}
                  </div>
                  <div className='single-transaction-date'>
                    {transaction.created_at.slice(0, 16)}
                  </div>

                </div>

                <div className='single-transaction-right'>
                  <div className='single-transaction-total'>
                    {transaction.move == 'in' ? '-' : '+'} {(transaction.purchased_price * transaction.quantity).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                  <div single-transaction-price>
                    {transaction.quantity} shares at {transaction.purchased_price}
                  </div>
                </div>

              </div>
              <hr></hr>
            </>
          )

        })}
      </div>
    </>
  );
};

export default GetAllTransactions;
