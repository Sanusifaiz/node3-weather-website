const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicdirectoryPath))
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Media',
        name: 'Sanusi Faiz'
    })   
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!',
        helpText: 'This is the help page',
        name: 'Sanusi Faiz'
    })
})
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sanusi Faiz'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Faiz'
//     }, {

//         age:25
//     }])
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>SODIQ IS A SCAMMER!!!!</h1>')
// })

app. get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address!!'
        })
    }
    
  
    
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    }
  
       forecast(latitude, longitude, (error, forecastData) => {
         if (error) {
           return res.send({error})
         }
  
         res.send([{
        location: location,
        forecast: forecastData
 
    }])
        // console.log(data.location)
        // console.log(forecastData)
      })
  })
    
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('help404', {
        note: 'Help article not found',
        name: 'Sanusi Faiz'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        note: 'Page not found !!',
        name: 'Sanusi Faiz'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 
