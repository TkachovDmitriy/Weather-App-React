import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Chart(props) {
  const tempOfDay = [];
  const timeOfDay = [];
  const { hourly } = props.cityDetails;
  for (let item in hourly) {
    if (item !== "0" && item < 25) {
      const date = new Date(hourly[item].dt * 1000);
      timeOfDay.push(`${date.getHours()}:00`);
      tempOfDay.push(Math.round(hourly[item].temp - 273));
      // console.log(item);
      // console.log(`${date.getHours()}:00`);
    }
  }

  const options = {
    title: {
      text: "Weather",
    },
    xAxis: [
      {
        categories: [...timeOfDay],
        // crosshair: true
      },
    ],
    series: [
      {
        name: "Temperature",
        type: "spline",
        data: [...tempOfDay],
        tooltip: {
          valueSuffix: "°C",
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
