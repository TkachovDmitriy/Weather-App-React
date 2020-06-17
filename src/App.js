import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./commponents/Header";
import Dashboard from "./commponents/Dashboard";
import CityDetails from "./commponents/CityDetails";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./commponents/Alert";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Header />
            <Alert />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/city_details/:paramOne&:paramTwo"
                component={CityDetails}
              />
            </Switch>
          </Router>
        </AlertProvider>
      </Provider>
    </div>
  );
}

export default App;
