import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";

const ItemChart = () => {
  const options = {
    data: [
      {
        Mission: "CRS SpX-25",
        Company: "SpaceX",
        Location: "LC-39A, Kennedy Space Center, Florida, USA",
        Date: "2022-07-15",
        Time: "0:44:00",
        Rocket: "Falcon 9 Block 5",
        Price: "12480000",
        Successful: "true",
      },
      {
        Mission: "Starlink Group 3-1",
        Company: "SpaceX",
        Location: "SLC-4E, Vandenberg SFB, California, USA",
        Date: "2022-07-11",
        Time: "1:39:00",
        Rocket: "Falcon 9 Block 5",
        Price: "11590000",
        Successful: "true",
      },
      {
        Mission: "Starlink Group 4-21",
        Company: "SpaceX",
        Location: "SLC-40, Cape Canaveral SFS, Florida, USA",
        Date: "2022-07-07",
        Time: "13:11:00",
        Rocket: "Falcon 9 Block 5",
        Price: 2330000,
        Successful: "false",
      },
      {
        Mission: "SES-22",
        Company: "SpaceX",
        Location: "SLC-40, Cape Canaveral SFS, Florida, USA",
        Date: "2022-06-29",
        Time: "21:04:00",
        Rocket: "Falcon 9 Block 5",
        Price: 16350000,
        Successful: "true",
      },
      {
        Mission: "Globalstar FM15 & USA 328 to 331",
        Company: "SpaceX",
        Location: "SLC-40, Cape Canaveral SFS, Florida, USA",
        Date: "2022-06-19",
        Time: "4:27:00",
        Rocket: "Falcon 9 Block 5",
        Price: 24900000,
        Successful: "true",
      },
      {
        Mission: "SARah 1",
        Company: "SpaceX",
        Location: "SLC-4E, Vandenberg SFB, California, USA",
        Date: "2022-06-18",
        Time: "14:19:00",
        Rocket: "Falcon 9 Block 5",
        Price: 19560000,
        Successful: "true",
      },
      {
        Mission: "Starlink Group 4-19",
        Company: "SpaceX",
        Location: "LC-39A, Kennedy Space Center, Florida, USA",
        Date: "2022-06-17",
        Time: "16:09:00",
        Rocket: "Falcon 9 Block 5",
        Price: 23140000,
        Successful: "true",
      },
      {
        Mission: "Nilesat-301",
        Company: "SpaceX",
        Location: "SLC-40, Cape Canaveral SFS, Florida, USA",
        Date: "2022-06-08",
        Time: "21:04:00",
        Rocket: "Falcon 9 Block 5",
        Price: 19220000,
        Successful: "true",
      },
      {
        Mission: "Transporter 5",
        Company: "SpaceX",
        Location: "SLC-40, Cape Canaveral SFS, Florida, USA",
        Date: "2022-05-25",
        Time: "18:35:00",
        Rocket: "Falcon 9 Block 5",
        Price: 16680000,
        Successful: "true",
      },
      {
        Mission: "Starlink Group 4-18",
        Company: "SpaceX",
        Location: "LC-39A, Kennedy Space Center, Florida, USA",
        Date: "2022-05-18",
        Time: "10:59:00",
        Rocket: "Falcon 9 Block 5",
        Price: 2250000,
        Successful: "true",
      },
    ],
    title: {
      text: "Sample Price Composition for SpaceX",
    },
    series: [
      {
        type: "pie",
        angleKey: "Price",
        legendItemKey: "Mission",
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

export default ItemChart;
