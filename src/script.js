"use strict";

import { getData, getLocation } from "./dashboard.js";

const inputIp = document.querySelector(".input__address");
const btnSearch = document.querySelector(".btn__search");

// when search button is clicked
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputIp.value) {
    alert("Please input an IP address");
    return;
  }

  getData(inputIp.value);
});
