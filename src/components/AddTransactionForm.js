import React, { useState } from "react";

function AddTransactionForm() {
  // Initialize transaction state
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0
  });

  // Handle form submission
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the transaction state with the new value
    setTransaction((prevTransaction) => ({...prevTransaction,[name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle response data if needed
        console.log("Transaction added:", data);
        setTransaction({
          date: "",
          description: "",
          category: "",
          amount: 0
        }); // Reset form after submission
      })
      // Handle errors
      .catch((error) => console.error("Error adding transaction:", error));
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={transaction.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={transaction.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={transaction.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button primary" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
