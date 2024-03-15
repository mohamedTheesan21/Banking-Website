import React from "react";
import { Chart } from "react-google-charts";

// const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7],
// ];

const options = {
  title: "Total Sent and Received Amounts",
  is3D: true,
  backgroundColor: "transparent",
  colors: ["red", "green"],
};

function PieChart(props) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Chart
        chartType="PieChart"
        data={props.data}
        options={options}
        width={"100%"}
        height={"100"}
      />
    </div>
  );
}

export default PieChart;
