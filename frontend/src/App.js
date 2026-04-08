import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import ExpensePieChart from "./ExpensePieChart";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ✅ AFTER ALL IMPORTS
function getUserId() {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = "user_" + Date.now();
    localStorage.setItem("userId", userId);
    console.log("NEW userId:", userId);
  } else {
    console.log("EXISTING userId:", userId);
  }

  return userId;
}

function App() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [theme, setTheme] = useState("light");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ✅ Create userId once when app loads
  useEffect(() => {
    getUserId();
  }, []);

  // ✅ Fetch data with userId
  const fetchExpenses = async () => {
    const userId = getUserId();

    const res = await axios.get(
      `https://expense-tracker-backend-a0cg.onrender.com/api/expenses?userId=${userId}`
    );

    setExpenses(res.data);
  };

  // Theme toggle
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Load data on start
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter logic
  const filteredExpenses = expenses.filter((e) => {
    const expenseDate = new Date(e.date);
    const now = new Date();

    if (filter === "7") {
      if ((now - expenseDate) / (1000 * 60 * 60 * 24) > 7) return false;
    }

    if (filter === "30") {
      if ((now - expenseDate) / (1000 * 60 * 60 * 24) > 30) return false;
    }

    if (filter === "year" && selectedYear !== "all") {
      if (expenseDate.getFullYear().toString() !== selectedYear) return false;
    }

    if (filter === "custom" && fromDate && toDate) {
      if (
        expenseDate < new Date(fromDate) ||
        expenseDate > new Date(toDate)
      ) return false;
    }

    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    if (categoryFilter !== "all" && e.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonth = new Date().getMonth();
  const monthlyTotal = filteredExpenses
    .filter((e) => new Date(e.date).getMonth() === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  const years = [...new Set(expenses.map((e) => new Date(e.date).getFullYear()))];
  const sortedYears = years.sort((a, b) => b - a);

  // Export to Excel
  const exportToExcel = () => {
    const data = filteredExpenses.map((e) => ({
      Title: e.title,
      Amount: e.amount,
      Category: e.category,
      Date: new Date(e.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "Expenses.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-5">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-5 rounded shadow-lg">

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <select
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">
          Expense Tracker
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
          </select>
        </div>

        <h2>Total: ₹{total}</h2>
        <h3>This Month: ₹{monthlyTotal}</h3>

        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-indigo-500 text-white rounded mb-4"
        >
          Export to Excel
        </button>

        <ExpenseForm refresh={fetchExpenses} />
        <ExpenseList expenses={filteredExpenses} refresh={fetchExpenses} />

        <ExpenseChart expenses={filteredExpenses} />
        <ExpensePieChart expenses={filteredExpenses} />
      </div>
    </div>
  );
}

export default App;