import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function ExpenseChart({ expenses }) {
  const monthlyData = {};

  expenses.forEach((e) => {
    const month = new Date(e.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += e.amount;
  });
  const sortedMonths = Object.keys(monthlyData).sort(
  (a, b) => new Date(a) - new Date(b)
  );
  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Expenses",
         data: sortedMonths.map((m) => monthlyData[m]),
      },
    ],
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <Bar data={data} />
    </div>
  );
}

export default ExpenseChart;