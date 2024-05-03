import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
        display: true,
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
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    console.log("prices", prices);

    let a_data = [];
    let a_labels = [];

    prices.forEach((element) => {
      let date = new Date(element.created_at);
      a_labels.push(
        date.toLocaleDateString() + " " + date.toLocaleTimeString()
      );
      a_data.push(element.price);
    });

    setData(a_data.reverse());
    setLabels(a_labels.reverse());

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
      <Line
        height={400}
        width={500}
        options={options}
        data={{ labels, datasets }}
      />
    </div>
  );
}
