const path = require('path')
const express = require('express')
const hbs = require("hbs")
const request = require('request')
const app = express()

const getGeo = require('./utilities/geo')
const getWeather = require('./utilities/forecast')

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const publicHelpPath = path.join(__dirname, '../public/help')
const publicAboutPath = path.join(__dirname, '../public/about')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory serve
app.use(express.static(publicDirPath))
app.use(express.static(publicHelpPath))
app.use(express.static(publicAboutPath))



app.get('', (req, res) => {
    res.render('index', {
        title: "Weatherilla",
        name: "The Cat"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'The Cat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'The Supervisor Cat'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter a valid address'
        })
    }


    getGeo(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {

        if (error) {
            return res.send({
                error: 'Error. Unable to detect location. Try another search'
            })
        }

        getWeather(latitude, longitude, (error, dataForecast) => {

            if (error) {
                return res.send({
                    error: 'There was error related to Forecast'
                })
            }

            res.send({
                forecast: dataForecast,
                location: location,
                address: req.query.address

            })
        })

    })



})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'The Supervisor Cat',
        errorMessage: 'The article you searched about HELP not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'The PR Cat'
    })
})




app.listen(4000, () => {
    console.log('Server is running on port 4000');

})