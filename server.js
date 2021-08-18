
projectData = {};

const express = require('express');


const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));


app.listen(2599, function(){
    console.log('Server is runing on port 2599');
});

app.get('/all', function (request, response) {
    response.send(projectData)
})

app.post('/addWeatherData', function (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_response = req.body.user_response;
    res.end();
    console.log(projectData)
})

