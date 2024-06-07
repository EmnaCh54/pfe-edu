// src/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartUser = (props) => {
  const { dataUser } = props;
  const data = {
    labels: ["Etudiant", "Parent", "Enseignant"],
    datasets: [
      {
        label: "Nombre d'utilisateurs",
        data: dataUser, // Example data
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
        ],
      },
    ],
  };

  const options = {
    responsive: false,
    scales: {
      r: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nombre d'utilisateurs par rôle",
      },
    },
  };

  return <Bar data={data} options={options} width={`800px`} />;
};

export default BarChartUser;
