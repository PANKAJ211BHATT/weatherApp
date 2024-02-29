let locationinput = '';
const APIkey = 'c670a7547db47b192f9197a34cd1fbfb';




function handleit() {
  locationinput = document.getElementById('locationInput').value;
  
  
  const lonlet = `http://api.openweathermap.org/geo/1.0/direct?q=${locationinput}&appid=${APIkey}`;

  fetch(lonlet)
    .then(response => response.json())
    .then(data => {
      const latitudevalue = data[0].lat;
      const longitudevalue = data[0].lon;

      tem(latitudevalue, longitudevalue);
      timetemprature(latitudevalue, longitudevalue,APIkey);
      
      
      
    })
    .catch(error => console.error('Error:', error));

  function tem(latitudevalue, longitudevalue) {
    const temp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudevalue}&lon=${longitudevalue}&appid=${APIkey}&units=metric`;

    fetch(temp)
      .then(response => response.json())
      .then(tempdata => {
        const temperatureincel = Math.round(tempdata.main.temp);

        const descriptionmain = tempdata.weather[0].main;
        const description = tempdata.weather[0].description;
        updateTemperature(temperatureincel, descriptionmain, description);

        
        
      })
      .catch(error => console.error('Error:', error));
  }


  function realtime() {
    const currenttimeUrl = `https://timezone.abstractapi.com/v1/current_time?api_key=4d041e26cd2643c9ba34606173e9f063&location=${locationinput} `;
  
    fetch(currenttimeUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const curtim =  data.datetime;
        updateCurrentTime(curtim);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
  



  function timetemprature(latitudevalue, longitudevalue, APIkey) {
    const timetemp = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudevalue}&lon=${longitudevalue}&appid=${APIkey}&units=metric`;
  
    fetch(timetemp)
      .then(response => response.json())
      .then(timedata => {
        // Clear previous forecast data
        document.getElementById('timeforecast-container').innerHTML = '';
  
        
        for (const forecast of timedata.list) {
          const dateTime = forecast.dt_txt;
          const temperature = Math.round(forecast.main.temp);
          
            updatetimetemp(dateTime, temperature);
        }

        
      })
      .catch(error => console.error('Error:', error));
  }



  function updateTemperature(temperature, descriptionmain, description) {
    const temperaturePlaceholder = document.getElementById(
      'temperaturePlaceholder'
    );
    const descriptionmainPlaceholder =
      document.getElementById('descriptionmain');
    const descriptionplaceholder = document.getElementById('description');

    container.style.height = '500px';
    container.style.width = '31.25rem';

    descriptionmainPlaceholder.textContent = `${descriptionmain}`;

    descriptionplaceholder.textContent = `${description}`;

    temperaturePlaceholder.textContent = `${temperature}°C`;
    container.classList.add('transition-effect');
  }
  realtime(locationinput);

  function updatetimetemp(dateTime, temperature) {
  const timeforecastContainer = document.getElementById('timeforecast-container');

  // Create a new timebox element
  const timebox = document.createElement('div');
  timebox.classList.add('timebox');

  // Format the date and time
  const formattedDateTime = new Date(dateTime);
  const timeString = formattedDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });    
  timebox.innerHTML = `<p>${timeString}</p><br><p>${temperature}°C</p>`;

 
  timeforecastContainer.appendChild(timebox);
}

function updateCurrentTime(curtim){
  const ate= new Date(curtim)
  document.getElementById("datehai").innerHTML=ate.toLocaleTimeString('en-US');
  document.getElementById("pnak").innerHTML=ate.toLocaleDateString();

  setInterval(realtime,100);
}

}
