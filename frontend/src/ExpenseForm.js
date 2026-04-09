import React, { useState } from "react";
import axios from "axios";

function ExpenseForm({ refresh }) {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  // ✅ function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://expense-tracker-backend-a0cg.onrender.com/api/expenses",
        data,
        {
          headers: {
            Authorization: token
          }
        }
      );

      // clear form
      setData({
        title: "",
        amount: "",
        category: "",
        date: ""
      });

      refresh(); // reload expenses

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">

      <input
        className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        placeholder="Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <input
        type="number"
        className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        placeholder="Amount"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: e.target.value })}
      />

      <input
        className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        placeholder="Category"
        value={data.category}
        onChange={(e) => setData({ ...data, category: e.target.value })}
      />

      <input
        type="date"
        className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
      />

      <button className="w-full bg-blue-500 text-white p-2 rounded">
        Add Expense
      </button>

    </form>
  );
}

export default ExpenseForm;