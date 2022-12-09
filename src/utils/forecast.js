const http = require('http')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=4198362410415db3501b1199a7297701&query=' + latitude + ',' + longitude + '&units=f'

  request({ url, json: true }, (error, { body }) => {
    const { success, current: currentInfo } = body

    if (error) {
      callback('Unable to connect to weatherstack API')
    } else if (success === false) {
      callback('No search results found')
    } else {
      const { temperature, feelslike, weather_descriptions } = currentInfo

      callback(undefined, `${weather_descriptions}: It is currently ${temperature} degrees out. \nIt feels like ${feelslike} degrees out.`)
    }
  })
}


module.exports = forecast