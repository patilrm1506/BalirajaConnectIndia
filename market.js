async function loadStates() {

    let response = await fetch("database/states.json");
    let states = await response.json();

    let state = document.getElementById("state");

    states.forEach(function(item){
        state.innerHTML += `<option>${item}</option>`;
    });

}

loadStates();

async function loadDistricts(){

    let response = await fetch("database/districts.json");
    let districts = await response.json();

    let district = document.getElementById("district");

    districts.forEach(function(item){
        district.innerHTML += `<option>${item}</option>`;
    });

}

loadDistricts();

async function getMarketPrice(){

    let crop = document.getElementById("crop").value;
    let state = document.getElementById("state").value;
    let district = document.getElementById("district").value;

    let response = await fetch("database/prices.json");
    let prices = await response.json();

    let result = prices.find(function(item){
        return item.state == state &&
               item.district == district &&
               item.crop == crop;
    });

    if(result){

        document.getElementById("marketResult").innerHTML = `
        <h3>📍 राज्य : ${state}</h3>
        <h3>🏙️ जिल्हा : ${district}</h3>
        <h3>🌾 पीक : ${crop}</h3>
        <br>
        <h2>💰 बाजारभाव : ${result.price}</h2>
        `;

    }else{

        document.getElementById("marketResult").innerHTML =
        "❌ या पिकाचा बाजारभाव उपलब्ध नाही.";

    }

}