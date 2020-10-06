import axios from "axios";

export const fetchPlaces = async (location) => {
  try {
    const { data: result } = await axios({
      method: "POST",
      url: "/weather",
      data: JSON.stringify({ place: location }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.error) throw result.error;
    else {
      return result.places;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const forecast = async (latitude, longitude) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "/forecast",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ latitude, longitude }),
    });
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export function postWeather(location, data) {
  axios({
    method: "POST",
    url: "/postWeather",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ location, data }),
  }).catch((err) => console.log(err));
}

export function loadWeather() {
  return axios({
    method: "GET",
    url: "/getWeather",
  })
    .then((result) => result.data)
    .catch((err) => err);
}
