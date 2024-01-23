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
      <AgChartsReact options={options} />
  );
};

export default ItemChart;
