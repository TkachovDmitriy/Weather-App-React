import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCity } from "../actions/city";

export default connect(null, { getCity })(function CreateCity(props) {
  const [countryName, setCountryName] = useState("");

  CreateCity.propTypes = {
    getCity: PropTypes.func.isRequired,
  };
  const onChange = (e) => {
    setCountryName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.getCity(countryName);
  };

  return (
    <div
      className="d-flex justify-content-center card card-body "
      style={{ maxWidth: "400px", margin: "1.5rem auto" }}
    >
      <h2>Add City</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex">
          <input
            className="form-control mr-2"
            type="text"
            name="country"
            onChange={onChange}
            value={countryName}
            placeholder="London"
          />
          <button type="submit" className="btn btn-secondary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
});
