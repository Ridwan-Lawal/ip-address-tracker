"use strict";

import { getData, getLocation } from "./dashboard.js";

const inputIp = document.querySelector(".input__address");
const btnSearch = document.querySelector(".btn__search");
const map = document.querySelector("#map");

// page onLoad
const getDeviceLocation = function () {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { longitude } = position.coords;
      const { latitude } = position.coords;
      getLocation(latitude, longitude);
    },
    (err) => alert(err)
  );
};
window.addEventListener("load", getDeviceLocation);

// when search button is clicked
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputIp.value) {
    alert("Please input an IP address");
    return;
  }

  getData(inputIp.value);
});
