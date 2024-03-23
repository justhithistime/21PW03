const express = require('express');
const request = require('request');

const app = express();

const weatherOptions = {
  method: 'GET',
  url: 'https://open-weather13.p.rapidapi.com/city/london',
  headers: {
    'X-RapidAPI-Key': 'fbb418a022msh7f52a387bd6d974p1615efjsnd14b1a571b85',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
};

app.use(express.static(__dirname)); // Serves static files from the current directory

app.get('/weather', (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  weatherOptions.url = `https://open-weather13.p.rapidapi.com/city/${city}`;

  request(weatherOptions, function (error, response, body) {
    if (error) {
      res.status(500).send('Error fetching weather data');
    } else {
      res.send(body);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
