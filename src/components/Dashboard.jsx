import React, { useContext, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ItemChart from "./Item";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const providerState = useContext(AuthContext);
  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState();
  const piChartComp = useRef(null);


  const [columnDefs, setColDefs] = useState([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "time" },
    { field: "rocket" },
    { field: "price" },
    { field: "successful" },
    {
      headerName: "Price Ditribution Chart",
      cellRenderer: (params) => {
        return (
          <button
            onClick={() => {
              handleButtonClick(params.data, rowData);
            }}
          >
            Click Me
          </button>
        );
      },
    },
  ]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .then((res) => {
        let item = res.data[0];
        let tempColDefs = [];
        for (let key in item) {
          tempColDefs.push({ field: key });
        }
        setRowData(res.data);
      });
  }, []);

  useEffect(() => {
    setColDefs((prev) => {
      return [
        {
          field: "mission",
        },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "time" },
        { field: "rocket" },
        { field: "price", filterType: "number" },
        { field: "successful" },
        {
          headerName: "Price Ditribution Chart",
          cellRenderer: (params) => {
            return (
              <button onClick={() => handleButtonClick(params.data, rowData)}>
                Click Me
              </button>
            );
          },
        },
      ];
    });

    return () => setLoading(false);
  }, [rowData]);

  const handleButtonClick = (temp) => {
    let tempChartData = [];
    tempChartData = rowData.filter((item) => {
      if (item.company == temp.company) {
        return true;
      }
    });
    setChartData(tempChartData);
    setShowDetails(true);
    piChartComp.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    providerState.logoutUser();
    navigate("/login");
  };

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return (
    !loading && (
      <div>
        <h1 align="center">SpaceVue</h1>
        <div className="top-buttons">
          <button
            onClick={() => {
              onExportClick();
            }}
          >
            Export Data
          </button>

          <div>
            {providerState.authState.isAuth && (
              <span>{providerState.authState?.user.username} </span>
            )}
            <button data-testid="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: "80vh", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={(e) => {
              setGridApi(e.api);
            }}
          ></AgGridReact>
        </div>
        <div ref={piChartComp}>{showDetails && <ItemChart data={chartData} />}</div>
      </div>
    )
  );
};

export default Dashboard;
