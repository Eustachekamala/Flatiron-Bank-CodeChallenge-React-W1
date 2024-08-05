import React, { useState, useEffect } from 'react';

function Transaction({ transactionId }) {
  const [transaction, setTransaction] = useState(null);// Initialize transaction state
  const [isDeleted, setIsDeleted] = useState(false);// Initialize isDeleted state

  useEffect(() => {
    if (transactionId) {
      // Fetch the specific transaction data from the backend when the component mounts or transactionId changes
      fetch(`http://localhost:8001/transactions/${transactionId}`)
        .then(res => {
          if (!res.ok) {
            // If the response is not ok, throw an error
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        // Set the transaction state with the fetched data
        .then(data => setTransaction(data))
        .catch(error => console.error('Error fetching transaction:', error));
    }
  }, [transactionId]);

  const handleDelete = () => {
    if (transactionId) {
      // Delete the specific transaction by id
      fetch(`http://localhost:8001/transactions/${transactionId}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) {
            // If the response is not ok, throw an error
            throw new Error('Network response was not ok');
          }
          setIsDeleted(true);
          console.log('Transaction deleted');
        })
        .catch(error => console.error('Error deleting transaction:', error));
    }
  };

  // Render the transaction data
  if (isDeleted) {
    return <tr><td colSpan="6">Transaction deleted</td></tr>;
  }
  // If the transaction data is not available, render a loading message
  if (!transaction) {
    return <tr><td colSpan="6">Loading...</td></tr>;
  }

  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>
        <button className="ui button negative" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Transaction;
