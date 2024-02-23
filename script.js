let locationinput = '';
    const APIkey = 'c670a7547db47b192f9197a34cd1fbfb';

    function handleit() {
        locationinput = document.getElementById("locationInput").value;

        const lonlet = `http://api.openweathermap.org/geo/1.0/direct?q=${locationinput}&appid=${APIkey}`;

        fetch(lonlet)
            .then(response => response.json())
            .then(data => {
                const latitudevalue = data[0].lat;
                const longitudevalue = data[0].lon;

                tem(latitudevalue, longitudevalue);
            })
            .catch(error => console.error('Error:', error));

        function tem(latitudevalue, longitudevalue) {
            const temp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudevalue}&lon=${longitudevalue}&appid=${APIkey}`;

            fetch(temp)
                .then(response => response.json())
                .then(tempdata => {
                    const temperatureinkelvin = tempdata.main.temp;
                    const temperatureincel = temperatureinkelvin-273.15;

                    const descriptionmain =tempdata.weather[0].main;
                    const description =tempdata.weather[0].description;
                    updateTemperature(temperatureincel,descriptionmain,description);
                })
                .catch(error => console.error('Error:', error));
        }

        function updateTemperature(temperature,descriptionmain,description) {
            const temperaturePlaceholder = document.getElementById('temperaturePlaceholder');
            const descriptionmainPlaceholder =document.getElementById('descriptionmain');
            const descriptionplaceholder =document.getElementById('description');

            container.style.height = "400px";
            container.style.width = "400px";

            descriptionmainPlaceholder.textContent=`${descriptionmain}`

            descriptionplaceholder.textContent=`${description}`

            temperaturePlaceholder.textContent = `${temperature.toFixed(2)} °C`;
            container.classList.add('transition-effect');
        }
    }