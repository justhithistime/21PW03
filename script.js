document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = {};

    fetch(`/weather?city=${cityInput.value.trim()}`)
      .then(response => response.json())
      .then(data => {
        city.Place = `${data.name}, ${data.sys.country}`;

        const weatherDataElement = document.getElementById('weather-data');
        weatherDataElement.innerHTML = '';

        const relevantData = {
          'Temperature': `${data.main.temp}°C`,
          'Feels Like': `${data.main.feels_like}°C`,
          'Description': data.weather[0].description,
          'Wind Speed': `${data.wind.speed} m/s`,
          'Humidity': `${data.main.humidity}%`
        };

        Object.keys(relevantData).forEach(key => {
          const div = document.createElement('div');
          div.append(`<h2>${city.Place}</h2>`);
          div.classList.add('weather-data-item');
          div.innerHTML = `<span>${key}:</span> ${relevantData[key]}`;
          weatherDataElement.appendChild(div);
        });

        // Clear the input field after a successful query
        cityInput.value = '';
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  });
});