import React, { Fragment, useEffect } from "react";
import CityCard from "./CityCard";
import CreateCity from "./CreateCity";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { displayCity } from "../actions/city";

const styleCard = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const mapStateToProps = (state) => ({
  city: state.city.city,
});
// console.log(card);
export default connect(mapStateToProps, { displayCity })(function Dashboard(
  props
) {
  useEffect(() => {
    props.displayCity();
  }, []);

  const cityCard = props.city.map((item) => {
    return (
      <CityCard
        key={item.id}
        coord={item.coord}
        id={item.id}
        name={item.name}
        weather={item.weather["0"]}
        temperature={item.main}
      />
    );
  });

  return (
    <Fragment>
      <CreateCity />
      <div style={styleCard}>{cityCard}</div>
    </Fragment>
  );
});
