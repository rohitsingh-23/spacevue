import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ItemChart from "./Item";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const providerState = useContext(AuthContext);
  const navigate = useNavigate();
  const columnDefs = [
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "time" },
    { field: "rocket" },
    { field: "price" },
    { field: "successful" },
  ];
  const [gridApi, setGridApi] = useState();
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
        setLoading(false);
      });
  }, []);

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
          style={{ height: "95vh", width: "100%" }}
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
        <div className="pi-chart-container">
          <ItemChart />
        </div>
      </div>
    )
  );
};

export default Dashboard;
