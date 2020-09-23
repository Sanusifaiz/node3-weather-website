const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'from javaScript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageTwo.textContent = 'Loading...'
    messageOne.textContent = ''



    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data, error)=> {
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data[0].forecast
            messageTwo.textContent = data[0].location
                    }
    })
})
})