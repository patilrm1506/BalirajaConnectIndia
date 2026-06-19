const apiKey = "3a9ef429d6802c3bcc39fec60681b622";

async function getWeather() {

    let city = document.getElementById("city").value;

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;    let response = await fetch(url);
    let data = await response.json();

    if(data.cod==200){
let weather = data.weather[0].description;

if(weather=="clear sky") weather="☀️ स्वच्छ आकाश";
else if(weather=="few clouds") weather="⛅ थोडे ढग";
else if(weather=="scattered clouds") weather="☁️ विखुरलेले ढग";
else if(weather=="broken clouds") weather="☁️ ढगाळ वातावरण";
else if(weather=="overcast clouds") weather="☁️ पूर्ण ढगाळ";
else if(weather=="light rain") weather="🌦️ हलका पाऊस";
else if(weather=="moderate rain") weather="🌧️ मध्यम पाऊस";
else if(weather=="heavy intensity rain") weather="🌧️ मुसळधार पाऊस";
      document.getElementById("result").innerHTML = `
🌡️ तापमान : ${data.main.temp} °C <br><br>

🥵 जाणवणारे तापमान : ${data.main.feels_like} °C <br><br>

💧 आर्द्रता : ${data.main.humidity}% <br><br>

🌡️ कमाल तापमान : ${data.main.temp_max} °C <br><br>

❄️ किमान तापमान : ${data.main.temp_min} °C <br><br>

💨 वाऱ्याचा वेग : ${data.wind.speed} m/s <br><br>

☁️ हवामान : ${weather}
`;

    }else{

        document.getElementById("result").innerHTML=
        "❌ गाव सापडले नाही.";

    }

}

function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            showPosition,
            function(error){
                alert(error.message);
            }
        );

    } else {
        alert("तुमचा Browser Location Support करत नाही.");
    }

}

function showPosition(position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeatherByLocation(lat, lon);

}

async function getWeatherByLocation(lat, lon) {

   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("city").value = data.name;

    getWeather();
}