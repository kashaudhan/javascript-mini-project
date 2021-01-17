const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.getElementById("main");
const API_KEY = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = search.value;

    if(city){
        searchByLocation(city);
    }
});

async function searchByLocation(city){
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();
    console.log(respData);
    renderElement(respData);
}


function renderElement(data){
    const temp = Math.floor(data.main.temp - 273.15);
    const cityEl = document.createElement("div");
    cityEl.classList.add("cityEl");
    cityEl.innerText = temp;
    cityEl.innerHTML = `
    <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            ${temp}°C 
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
        <small>${data.weather[0].main}</small>
    `;

    main.innerHTML = "";
    main.appendChild(cityEl);

}
