import React from "react";
import { AgChartsReact } from "ag-charts-react";

const BarChart = ({ data, type }) => {
  const options = {
    title: {
      text:
        type === "rocket"
          ? `${data[0].company}'s number of rockets over the year`
          : `${data[0].company}'s budget over the year`,
    },
    data: data,
    series: [
      {
        type: "bar",
        xKey: "year",
        yKey: type === "rocket" ? "rockets" : "budget",
        yName: type === "rocket" ? "Rockets" : "Budget",
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

export default BarChart;
