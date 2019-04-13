window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function position(pos){
        let crd = pos.coords;

        long = crd.longitude;
        lat = crd.latitude;

        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/343b41eb2521da8776bf3c8195e4cf6e/${lat},${long}`;
            
        fetch(api)
        .then(response1=>{
            return response1.json();
        })
        .then(data => {
            const {temperature, summary, icon} = data.currently;

            temperatureDegree.textContent = Math.floor(temperature);
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            setIcons(icon, document.querySelector(".icon"));

            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor((temperature - 32) * (5/9));
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = Math.floor(temperature);
                }
            })
        });
    }

    function error(err){
        console.warn(`GEO LOC ERROR - ${err.code}: ${err.message}`);
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.add(iconID, Skycons[currentIcon]);
    }

    navigator.geolocation.getCurrentPosition(position, error, options);

    
});