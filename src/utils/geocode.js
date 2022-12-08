const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWRlaGVycmVyYSIsImEiOiJjbGJkd3ZlOGMwNW5uM25tZmdrNjdmY3I2In0.9Gsby3FDw3iZpWcGViw4UA&limit=1'

  console.log(url)

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        return callback('Unable to connect to Mapbox API')
      }

      if (body.features.length === 0) {
        callback('No search results found', undefined)
      } else {
        
        const [ longitude, latitude ] = body.features[0].center
        const location = body.features[0].place_name
        callback(undefined, {
          latitude,
          longitude,
          location
        })
      }
    })
}

module.exports = geocode;