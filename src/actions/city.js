import axios from "axios";
import { GET_CITY, DISPLAY_CITY, GET_CITY_DETAILS } from "./types";

const API_KEY = "8ec43a2f28a7f62023e6911704d8d39c";
// const URI = `weather?q=Ukrain&appid=${API_KEY}`;

export const getCity = (city) => async (dispatch) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    console.log(res.data);
    const data = JSON.stringify(res.data);
    localStorage.setItem(res.data.id, data);
    // dispatch({
    //   type: GET_CITY,
    //   payload: res.data,
    // });
    dispatch(displayCity());
  } catch (e) {
    console.log(e);
  }
};

export const getCityDetails = (lat, lon) => async (dispatch) => {
  let res = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=daily&appid=${API_KEY}`
  );
  // console.log(res.data);
  dispatch({
    type: GET_CITY_DETAILS,
    payload: res.data,
  });
};

export const displayCity = () => (dispatch) => {
  try {
    const dataForCity = [];
    const city = { ...localStorage };
    for (let item in city) {
      dataForCity.push(JSON.parse(city[item]));
      // console.log("item", item, JSON.parse(cards[item]));
    }
    let sortData = dataForCity.sort();
    console.log(sortData);
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
    dispatch(displayCity());
  } catch (e) {
    console.log(e);
  }
};
