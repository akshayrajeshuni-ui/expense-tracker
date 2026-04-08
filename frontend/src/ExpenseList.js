import React from "react";
import axios from "axios";

function ExpenseList({ expenses, refresh }) {

  const deleteExpense = async (id) => {
  const userId = localStorage.getItem("userId"); // ✅ get userId

  await axios.delete(
    `https://expense-tracker-backend-a0cg.onrender.com/api/expenses/${id}?userId=${userId}`
  );

  refresh(); // 🔥 update list after delete
 };

 return (``
  <div>
    <h2 className="text-xl font-semibold mb-2">Expenses</h2>

    {expenses.map((e) => (
      <div
        key={e._id}
        className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2"
      >
        <span>
          {e.title} - ₹{e.amount} ({e.category}) <br />
          <small>{new Date(e.date).toLocaleDateString()}</small>
        </span>

        <button
          onClick={() => deleteExpense(e._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

export default ExpenseList;