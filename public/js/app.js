// Client-side version of search script
console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = search.value
  const url = 'http://api.weatherstack.com/current?access_key=4198362410415db3501b1199a7297701&query=' + location + '&units=f'

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error.info
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = data.request.query
        messageTwo.textContent = data.current.temperature + ' degrees Fahrenheit'
      }
    })
  })
})