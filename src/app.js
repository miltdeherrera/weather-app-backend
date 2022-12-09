const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Enter in a partial or complete address to find out what the current and apparent weather conditions are there. The more specific the address, the better likelihood of a salient answer.',
    title: 'Help page',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

  const address = req.query.address

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData, weather_icons) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address,
        weather_icons
      })
    })
  })

  app.get('/products', (req, res) => {
    if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term.'
      })
    }

    console.log(req.query)
    res.send({
      products: []
    })
  })

  app.get('/help/*', (req, res) => {
    res.render('404', {
      title: '404 page',
      errorMessage: 'Help article not found.'
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    errorMessage: 'Page not found.',
    name: 'Milt D'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})