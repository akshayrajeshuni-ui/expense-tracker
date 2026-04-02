import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function ExpensePieChart({ expenses }) {
  const categoryData = {};

  expenses.forEach((e) => {
    if (!categoryData[e.category]) {
      categoryData[e.category] = 0;
    }
    categoryData[e.category] += e.amount;
  });

  const data = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      label: "Expenses by Category",
      data: Object.values(categoryData),
      backgroundColor: [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#b0a8c5",
        "#EC4899",
      ],
    },
  ],
};

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpensePieChart;