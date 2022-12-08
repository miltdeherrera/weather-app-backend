const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    title: 'Home page',
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
  res.send({
    forecast: 'Brown',
    location: 'Muskogee'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 page',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    errorMessage: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})