import React from "react";
import { useState, useEffect } from "react";

function Search() {
  //TODO: Add search functionality
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);
  const handleSearch = event => {
    const searchTerm = event.target.value;
    // Filter transactions based on search term
    const filteredTransactions = transactions.filter(transaction => {
      // Check if the transaction description includes the search term
      return transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
    // Update the filtered transactions state
    setTransactions(filteredTransactions);
  };
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={() => handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
