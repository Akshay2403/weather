const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDrectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handblars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//startup static directory to serve
app.use(express.static(publicDrectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Akshay Sharma'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akshay sharma'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help page',
        name: 'Akshay Sharma'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })



})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshay Sharma',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshay Sharma',
        errorMessage: '404 Page not found'

    })
})

app.listen(port, (req, res) => {
    console.log('Server is running' + port)
})