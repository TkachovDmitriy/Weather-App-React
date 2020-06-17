import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./commponents/Header";
import Dashboard from "./commponents/Dashboard";
import CityDetails from "./commponents/CityDetails";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              exact
              path="/city_details/:paramOne&:paramTwo"
              component={CityDetails}
            />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
