var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials (header and footer) synchronously so they are
// guaranteed to exist before the first request is served
var partialsDir = path.join(__dirname, 'app_server', 'views', 'partials');
fs.readdirSync(partialsDir)
  .filter(function(file) { return path.extname(file) === '.hbs'; })
  .forEach(function(file) {
    hbs.registerPartial(
      path.basename(file, '.hbs'),
      fs.readFileSync(path.join(partialsDir, file), 'utf8')
    );
  });
// helper used by the partials to mark the current nav item
hbs.registerHelper('eq', (a, b) => a === b);
// format an ISO date string from trips.json, e.g. "February 15, 2026"
hbs.registerHelper('formatDate', (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });
});
// format a price string/number from trips.json as US currency
hbs.registerHelper('formatPrice', (amount) => {
  const n = Number(amount);
  if (isNaN(n)) return amount;
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
