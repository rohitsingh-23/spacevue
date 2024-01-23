import React from "react";
import { AgChartsReact } from "ag-charts-react";

const ItemChart = ({ data }) => {

  const options = {
    data: data,
    title: {
      text: `Price Distibution for ${data[0].company}`,
    },
    series: [
      {
        type: "pie",
        angleKey: "price",
        legendItemKey: "mission",
      },
    ],
  };

  return (
    <div className="ag-pi-chart-container">
      <AgChartsReact options={options} />
    </div>
  );
};

export default ItemChart;
