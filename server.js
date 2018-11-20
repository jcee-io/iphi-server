const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');


const calendarURL = require('./calendarURL');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist'));

app.get('/iphi2/calendar.php', async (req, res) => {
  try {
    const { data } = await axios.get(calendarURL, { params: { ...req.query } });
    res.send(data);
  } catch (err) {
    res.send(err);
  }

});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 8080);
