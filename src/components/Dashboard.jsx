import React, { useContext, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ItemChart from "./Item";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import BarChart from "./BarChart";

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState([]);
  const [piChartData, setPiChartData] = useState([]);
  const providerState = useContext(AuthContext);
  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState();
  const barChartComp = useRef(null);

  const [columnDefs, setColDefs] = useState([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "time" },
    { field: "rocket" },
    { field: "price" },
    {
      headerName: "See Charts",
      cellRenderer: (params) => {
        return (
          <button
            className="table-btn"
            onClick={() => handleCharts(params.data)}
          >
            {`See Chart of ${params.data.company}`}
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
    setColDefs(() => {
      return [
        { field: "mission" },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "time" },
        { field: "rocket" },
        { field: "price", filterType: "number" },
        {
          headerName: "See Charts",
          cellRenderer: (params) => {
            return (
              <button
                className="table-btn"
                onClick={() => handleCharts(params.data)}
              >
                {`See Charts of ${params.data.company}`}
              </button>
            );
          },
        },
      ];
    });
    return () => setLoading(false);
  }, [rowData]);

  const handleCharts = (temp) => {
    let tempChartData = [];
    tempChartData = rowData.filter((item) => {
      if (item.company === temp.company) {
        return true;
      }
      return false;
    });

    const yearData = Object.values(
      tempChartData.reduce((acc, obj) => {
        const key = obj.date.split("-")[0];
        acc[key] = acc[key] || {
          company: obj.company,
          year: key,
          rockets: 0,
          budget: 0,
        };
        acc[key].rockets++;
        acc[key].budget = Number(acc[key].budget) + Number(obj.price);
        return acc;
      }, {})
    );

    setBarChartData(yearData);
    setPiChartData(tempChartData);

    alert(`Click OK to see charts of ${tempChartData[0].company}`);
    barChartComp.current.scrollIntoView({ behavior: "smooth" });
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
    cellStyle: (params) =>
      params.data.successful
        ? { backgroundColor: "#44C662", color: "white" }
        : { backgroundColor: "#F23A3A", color: "white" },
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return !loading ? (
    <div>
      <h1 align="center" className="title">
        SpaceVue
      </h1>
      <div className="top-buttons">
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="green"
          onClick={() => {
            onExportClick();
          }}
        >
          Export Data
        </Button>

        <div>
          {providerState.authState.isAuth && (
            <span>{providerState.authState?.user.username} </span>
          )}

          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
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
          pagination={true}
          paginationPageSize={20}
          onGridReady={(e) => {
            setGridApi(e.api);
          }}
        ></AgGridReact>
        <div className="table-info">
          <p>* Green Color Row shows successful mission</p>
          <p>* Red Color Row shows unsuccessful mission</p>
        </div>
      </div>
      <div
        ref={barChartComp}
        className={
          barChartData.length > 0 ? "ag-chart-container" : "ag-chart-container"
        }
      >
        {barChartData.length > 0 ? (
          <BarChart data={barChartData} type="rocket" />
        ) : null}
      </div>

      <div className={barChartData.length > 0 ? "ag-chart-container" : ""}>
        {barChartData.length > 0 ? (
          <BarChart data={barChartData} type="budget" />
        ) : null}
      </div>

      <div className={piChartData.length > 0 ? "ag-chart-container" : "none"}>
        {piChartData.length > 0 ? <ItemChart data={piChartData} /> : null}
      </div>
    </div>
  ) : (
    <div className="dashboard-spinner-div">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default Dashboard;
