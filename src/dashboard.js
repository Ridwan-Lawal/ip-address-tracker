"use strict";

const ipAddress = document.querySelector(".ip__address");
const location = document.querySelector(".location");
const timeZone = document.querySelector(".time__zone");
const isp = document.querySelector(".isp");
const mapSection = document.querySelector("#map");
const errorMessage = document.querySelector(".error-message");
const mainSection = document.querySelector("main");

/////// Data disiplay on the dashboard
export const displayData = function (data) {
  ipAddress.textContent = data?.query ?? "";
  location.textContent = `${data?.city ?? ""}, ${data?.countryCode ?? ""}`;
  timeZone.textContent = ` ${data?.timezone ?? ""}`;
  isp.textContent = data.isp;
};

////////  Map display

export const getLocation = function (lat, lng) {
  // map tiles
  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
};

// fetching data from api
export const getData = async function (ip) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);

    // if response.ok is false and status 404
    if (!res.ok) {
      throw new Error("Something went wrong fetching data :(");
    }

    // convert response to json which is the data
    const data = await res.json();
    // if data status fails
    if (data.status === "fail") {
      // for the error message
      //   remove the map div
      mapSection.classList.add("hidden");
      //   add the error div
      errorMessage.classList.remove("hidden");
    } else {
      // if data status is successful
      displayData(data);
      // add the map div
      mapSection.classList.remove("hidden");
      //   remove the error message
      errorMessage.classList.add("hidden");
      // destructured to get the lat and lon from the data
    }

    console.log(data);
    const { lat: dataLat, lon: dataLng } = data;

    // remove the map
    // Did this so if other ip is inputed map would reload
    map.remove();
    // when map is removed then, another map el was created dynamically
    const mapped = `<div id="map" class="h-[60vh] md:h-[65vh]"></div>`;
    mainSection.insertAdjacentHTML("beforeend", mapped);
    // display map
    getLocation(dataLat, dataLng);
  } catch (err) {
    console.error(err);
  }
};
