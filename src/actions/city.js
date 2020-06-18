import axios from "axios";
import { DISPLAY_CITY, GET_CITY_DETAILS } from "./types";
import { createMessage, returnErrors } from "./messages";

const API_KEY = "8ec43a2f28a7f62023e6911704d8d39c";
// const URI = `weather?q=Ukrain&appid=${API_KEY}`;

export const getCity = (city) => async (dispatch) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = JSON.stringify(res.data);
    localStorage.setItem(res.data.id, data);

    dispatch(createMessage({ addCity: "City is  added" }));
    dispatch(displayCity());
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
    console.log(e);
  }
};

export const getCityDetails = (lat, lon) => async (dispatch) => {
  let res = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=daily&appid=${API_KEY}`
  );
  dispatch({
    type: GET_CITY_DETAILS,
    payload: res.data,
  });
};

export const displayCity = () => (dispatch) => {
  try {
    const dataForCity = [];
    const city = { ...localStorage };
    // console.log(city);
    Object.keys(city).forEach((key) => {
      // console.log(key);
      dataForCity.push(JSON.parse(city[key]));
    });

    // let sortData = dataForCity.sort((a, b) => new Date(a.dt) - new Date(b.dt));
    // console.log(sortData);
    dispatch({
      type: DISPLAY_CITY,
      payload: dataForCity,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteCity = (id) => (dispatch) => {
  try {
    localStorage.removeItem(id);
    dispatch(createMessage({ deleteCity: "City has been deleted" }));
    dispatch(displayCity());
  } catch (e) {
    console.log(e);
  }
};

export const updateCity = (city) => async (dispatch) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    localStorage.removeItem(res.data.id);
    localStorage.setItem(res.data.id, JSON.stringify(res.data));
    dispatch(createMessage({ updateCityInfo: "Weather Update" }));
    dispatch(displayCity());
  } catch (e) {
    console.log(e);
  }
};
