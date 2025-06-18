"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart({ workouts, color }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Prepare data for the line chart
    const sortedWorkouts = [...workouts].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const labels = sortedWorkouts.map((workout) =>
      new Date(workout.createdAt).toLocaleDateString()
    );
    const data = sortedWorkouts.map(
      (workout) => workout.stats.overall.percentage
    );

    // Create new chart
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Overall Completion",
            data,
            borderColor: color.border,
            backgroundColor: color.bg,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: color.border,
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: color.border,
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
              text: "Completion Percentage (%)",
              color: "#F8F8F8",
            },
            ticks: {
              color: "#F8F8F8",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
              color: "#F8F8F8",
            },
            ticks: {
              color: "#F8F8F8",
              maxRotation: 45,
              minRotation: 45,
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
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
  }, [workouts]);

  return (
    <div className="w-full h-80 bg-gray-800 rounded-lg p-4">
      <canvas ref={canvasRef} />
    </div>
  );
}
