const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
    name: 'Milt D'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Milt D'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: ' Here\'s where the help articles live',
    title: 'Help page',
    name: 'Milt D'
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

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address
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

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})