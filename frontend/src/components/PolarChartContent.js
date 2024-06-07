// src/BarChart.js
import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChartContent = (props) => {
  const { dataContent } = props;
  const data = {
    labels: ["Tests", "Devoir", "Cours", "Exercice"],
    datasets: [
      {
        label: "Nombre de contenu educatif",
        data: dataContent,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
          "rgba(75, 192, 16)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nombre de contenu educatif par type",
      },
    },
  };

  return <PolarArea data={data} options={options} height={`500px`} />;
};

export default PolarChartContent;
