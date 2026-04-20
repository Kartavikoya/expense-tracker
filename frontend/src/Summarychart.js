import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function SummaryChart({ expenses = [] }) {  // ✅ default empty array
  if (!expenses || expenses.length === 0) {
    return <p>No data for chart</p>;
  }

  const summary = {};

  expenses.forEach(e => {
    const cat = e.category?.toLowerCase() || "other";
    summary[cat] = (summary[cat] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(summary),
    datasets: [{
      data: Object.values(summary)
    }]
  };

  return (
    <div style={{ width: "400px" }}>
      <h3>Category Summary</h3>
      <Pie data={data} />
    </div>
  );
}

export default SummaryChart;