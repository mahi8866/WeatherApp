const express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get('/' , function(req, res)
{
    let sendData = {location:"Location", temp: "Temp", desc: "Description", iconurl: "icon", pressure: "Pressure", humidity: "Humidity", main: "Main", visibility: "Visibility", clouds: "Clouds" }
    res.render('list', {sendData: sendData});  
})

app.post('/', async function(req, res)
{
    const location = req.body.cityName;
    const apiKey = "29974194649e432d5a16aa3a461e01f2"
    const units = "metric"
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ location +',in&appid='+ apiKey +'&units='+ units ;
    const response = await fetch(url);
    const wData = await response.json();
    const temp = wData.main.temp  
    const desc = wData.weather[0].description
    const icon = wData.weather[0].icon
    const pressure = wData.main.pressure;
    const humidity = wData.main.humidity;
    const visibility = wData.visibility;
    const clouds = wData.clouds;
    const main = wData.weather[0].main;
    var iconurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
    const sendData = {};
    sendData.location = location;
    sendData.temp = temp;
    sendData.desc = desc;
    sendData.iconurl = iconurl;
    sendData.pressure = pressure;
    sendData.clouds = clouds.all;
    sendData.main = main;
    sendData.visibility = visibility;
    sendData.humidity = humidity;
    res.render('list', {sendData: sendData}); 
})



app.listen(4000, function()
{
    console.log('Server listen to the port:4000')
})