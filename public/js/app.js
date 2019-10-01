
const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")
const msg3 = document.querySelector("#msg-3")

const getWeather = location => {
  fetch(`http://localhost:5000/weather?address=${location}`).then(response => {
    response.json().then(data => {
    msg1.textContent = data.forecast;
    msg2.textContent = data.location;
    msg3.textContent = data.degrees
    });
  });
};



const btn = document.querySelector("form");
const input = document.querySelector("input");

btn.addEventListener("submit", e => {
  e.preventDefault();

  const location = input.value;
  getWeather(location);
});
