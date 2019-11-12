const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


const skycons = new Skycons({
  color: '#222'
})
skycons.set('icon', 'clear-day');
skycons.play();

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Please wait....";
  messageTwo.textContent = "";

  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

      }
    });
  });


  messageOne.textContent;
  messageTwo.textContent;
});

// function currentSkycons(icon, iconID) {

//   const currentIcon = iconSky.replace(/-/g, "_").toUppercase();
//   skycons.play();
//   return skycons.set(iconID, Skycons[currentIcon]);

// }