import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { alert, message, error } = this.props;
    if (error !== prevProps.error) {
      if (error) alert.error(`${error.msg.message}`);
    }
    if (message !== prevProps.message) {
      console.log(message);
      if (message.updateCityInfo) alert.success(message.updateCityInfo);
      if (message.addCity) alert.success(message.addCity);
      if (message.deleteCity) alert.success(message.deleteCity);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
