import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCityDetails } from "../actions/city";
import PropTypes from "prop-types";
import Chart from "./Chart";

const mapStateToProps = (state) => ({
  cityDetails: state.city.cityDetails,
});

export default connect(mapStateToProps, { getCityDetails })(
  function CityDetails(props) {
    const [coordParams, setCoordParams] = useState([]);
    // const [curentWeather, setCurentWeather] = useState({});

    CityDetails.propTypes = {
      cityDetails: PropTypes.object.isRequired,
      getCitydetails: PropTypes.func,
    };
    const setCoord = () =>
      setCoordParams([
        props.match.params.paramOne,
        props.match.params.paramTwo,
      ]);
    useEffect(() => {
      props.getCityDetails(
        props.match.params.paramOne,
        props.match.params.paramTwo
      );
      setCoord();
    }, []);

    if (props.cityDetails !== undefined) {
      const { current } = props.cityDetails;
      let sunrise = new Date(current.sunrise * 1000);
      let sunset = new Date(current.sunset * 1000);

      return (
        <div className="d-flex justify-content-center flex-wrap">
          <div className="card border-secondary  w-25 m-5 ">
            <div className="card-header">
              <h4>{props.cityDetails.timezone}</h4> (timezone)
            </div>
            <div className="card-body p-0">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Wind</td>
                    <td>
                      <i className="fas fa-wind mr-2"></i> {current.wind_speed}{" "}
                      m/s
                    </td>
                  </tr>
                  <tr>
                    <td>Cloudiness</td>
                    <td>
                      <i className="fas fa-cloud mr-2"></i>{" "}
                      {current.weather[0].description}
                    </td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>
                      <i className="fas fa-tint mr-2"></i> {current.humidity} %
                    </td>
                  </tr>
                  <tr>
                    <td>Sunrise</td>
                    <td>
                      <i className="fas fa-sun mr-2"></i>{" "}
                      {`${sunrise.getHours()}:${sunrise.getMinutes()}`}
                    </td>
                  </tr>
                  <tr>
                    <td>Sunset</td>
                    <td>
                      <i className="far fa-sun mr-2"></i>{" "}
                      {`${sunset.getHours()}:${sunset.getMinutes()}`}
                    </td>
                  </tr>
                  <tr>
                    <td>Geo coords</td>
                    <td>
                      [{coordParams[0]}, {coordParams[1]}]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Chart cityDetails={props.cityDetails} />
        </div>
      );
    }
    return (
      <div className="progress m-1">
        <div
          className="progress-bar bg-secondary progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        ></div>
      </div>
    );
  }
);
