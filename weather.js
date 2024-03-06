function getWeather(id, unit) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            //https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=314803c53e6c7f2543af1cce3a1947ec
            fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m&temperature_unit="+unit).then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                ).then(res => {
                    document.getElementById(id).innerHTML = res.data.current.temperature_2m + "°" + (unit === "fahrenheit" ? "F" : "C");
                }));
            //temperature = JSON.parse(temperature);

        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}