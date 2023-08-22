const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const app = express()

// Cach fix: res.json(req.body) - video 27: line 7-12
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());
const port = 3000

const route = require('./routes');
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))

// Template engine
app.engine(
  'hbs', 
  // function express-handlerbar
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
  }
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} on port ${port}`)
})