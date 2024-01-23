import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyAgGridComponent = () => {
  const rowData = [
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Smith", age: 30, city: "San Francisco" },
    { id: 3, name: "Bob Johnson", age: 28, city: "Chicago" },
  ];

  const columnDefs = [
    { headerName: "ID", field: "id", filter: "agNumberColumnFilter" },
    { headerName: "Name", field: "name", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agNumberColumnFilter" },
    { headerName: "City", field: "city", filter: "agTextColumnFilter" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <button onClick={() => handleButtonClick(params.data)}>Click Me</button>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  const handleButtonClick = (rowData) => {
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default MyAgGridComponent;
