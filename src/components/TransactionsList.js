import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);
  
  // TODO: Add a sort order dropdown
  const handleSort = event => {
    const newSortOrder = event.target.value;
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setSortOrder(newSortOrder);
    setTransactions(sortedTransactions);
  };

  if (transactions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label htmlFor="sortOrder">Sort by Date: </label>
        {/* TODO: Add a sort order dropdown */}
        <select id="sortOrder" value={sortOrder} onChange={handleSort}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* TODO: Add a table */}
      <table className="ui celled striped padded table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <Transaction key={transaction.id} transactionId={transaction.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
