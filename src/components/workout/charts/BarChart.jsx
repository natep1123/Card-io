"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function BarChart({ stats }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: ["Push", "Pull", "Legs", "Core", "Overall"],
        datasets: [
          {
            label: "Completion Percentage",
            data: [
              stats.push.percentage,
              stats.pull.percentage,
              stats.legs.percentage,
              stats.core.percentage,
              stats.overall.percentage,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 255, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 255, 255, 0.6)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Percentage (%)",
              color: "#F8F8F8",
            },
            ticks: {
              color: "#F8F8F8",
            },
          },
          x: {
            title: {
              display: true,
              text: "Muscle Group",
              color: "#F8F8F8",
            },
            ticks: {
              color: "#F8F8F8",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y.toFixed(1)}%`,
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stats]);

  return (
    <div className="w-full h-80 bg-gray-800 rounded-lg p-4">
      <canvas ref={canvasRef} />
    </div>
  );
}
