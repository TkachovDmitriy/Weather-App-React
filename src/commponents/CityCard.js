import React from "react";
import { connect } from "react-redux";
import { deleteCity, updateCity } from "../actions/city";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default connect(null, { deleteCity, updateCity })(function CardCity(
  props
) {
  CardCity.propTypes = {
    deleteCity: PropTypes.func.isRequired,
    updateCity: PropTypes.func.isRequired,
  };

  const updateInfo = () => {
    let cityName = props.name;
    console.log(cityName);
    props.updateCity(cityName);
  };

  let fToCel = props.temperature.temp - 273;

  return (
    <div
      className="card text-white bg-primary m-3"
      style={{ maxWidth: "25rem", minWidth: "15rem" }}
    >
      <div className="card-header d-flex justify-content-between">
        <h3 className="mr-auto">{props.name}</h3>
        <Link
          to={{
            pathname: `/city_details/${props.coord.lat}&${props.coord.lon}`,
            // props: { lat: props.coord.lat, lon: props.coord.lon },
          }}
          className="btn btn-info btn-sm  ml-3 mr-2  mb-3"
          style={{ letterSpacing: "4px", paddingRight: "3px" }}
        >
          <i className="fa fa-info" aria-hidden="true"></i>
        </Link>
        <button
          className="btn btn-danger mb-3 btn-sm"
          onClick={props.deleteCity.bind(this, props.id)}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center">
          <h4 className="card-title mr-3">{props.weather.main}</h4>
          <h4>{`${Math.floor(fToCel)} \xB0C.`}</h4>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`}
          alt="weather"
        />
        <div className="d-flex justify-content-between">
          <p className="card-text mr-2">{props.weather.description}</p>
          <button onClick={updateInfo} className="btn btn-info disable">
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
});
