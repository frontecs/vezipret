import { useState } from "react";
import { useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: true,
      title: {
        display: false,
        text: "Preț (RON)",
        color: "#fff",
      },
      ticks: {
        color: "#fff",
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff",
      },
    },
  },
};

export default function Chart({ prices }) {
  const labels = [];
  // i have no idea why i have to reverse it, but it works like this so i'm not gonna touch it.
  for (let i = prices.length - 1; i > -1; i--) {
    let date = new Date(prices[i].created_at);
    labels.push(date.toLocaleDateString() + " " + date.toLocaleTimeString());
  }
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    if (prices.length === 0) {
      return;
    }

    let data = [];
    prices.forEach((element) => {
      data.push(element.price);
    });

    setDatasets([
      {
        label: "Pret",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ]);
  }, [prices]);
  return (
    <div>
      <Line height={300} options={options} data={{ labels, datasets }} />
    </div>
  );
}
