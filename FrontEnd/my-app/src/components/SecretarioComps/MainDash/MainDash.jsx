import React from "react";
import Cards from "../Cards/Cards";
import Table from "../../utils/TableInasistencia/Table.jsx";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
