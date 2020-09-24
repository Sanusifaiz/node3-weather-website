const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

// messageOne.textContent = 'from javaScript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value



    messageTwo.textContent = 'Loading...'
    messageOne.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data, error)=> {
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageThree.textContent = data[0].time
            messageOne.textContent = data[0].forecast
            messageFour.textContent = data[0].humidity
            messageFive.textContent = data[0].forecastwind
            messageTwo.textContent = data[0].location
                    }
    })
})
})