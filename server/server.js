const express = require('express')
const morgan = require('morgan')
const path = require('path')
const router = require('./api')
const bodyParser = require("body-parser");
const { syncAndSeed } = require('./models')

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', router)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send( `Something went wrong. ${err.message}`
  );
});

syncAndSeed();
const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on ${port}`))
