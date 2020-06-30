const express = require('express')
const vrijeme = require('../services/prognoza.js')
const vijesti = require('../services/vijesti.js');

const WeatherRoute = new express.Router()
const NewsRoute = new express.Router()

WeatherRoute.get('/api/weather/today', async (req, res) =>{
    const grad = req.query.grad
    try {
        const data = await vrijeme.trenutnoVrijeme(grad)
        res.send(data)
    } catch (error) {
        res.status(406).send(error)
    }
})

WeatherRoute.get('/api/weather/nextDays', async (req, res) =>{
    const grad = req.query.grad
    try {
        const data = await vrijeme.vrijemeNarednihDana(grad)
        res.send(data)
    } catch (error) {
        res.status(406).send(error)
    }
})




NewsRoute.get('/api/news', async (req, res) =>{
    let page = req.query.page
    let data = await vijesti(page);
    res.send(data);
})


module.exports = {
    WeatherRoute: WeatherRoute,
    NewsRoute: NewsRoute
}