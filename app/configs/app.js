var express = require('express'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan  = require('morgan');



module.exports = function(app){
  app.set('db', require('./db') );

  app.set('env', process.env.NODE_ENV || 'development')
  app.set('port', process.env.PORT || 3000);

  app.set('baseDir', __dirname + '/../../');

  app.set('views', app.get('baseDir') + '/app/views');
  app.set('view engine', 'jade');


  app.use(favicon(app.get('baseDir') + '/public/favicon.ico'));

  if ( 'production' == app.get('env') ) {
    app.use( morgan('short') );
  }

  if ( 'development' == app.get('env') ) {
    app.use( morgan('dev') );
  }

  app.use( express.static(app.get('baseDir') + "/public") );

  app.use( cookieParser('optional secret string') );
  app.use( session({ secret: 'keyboard cat'}) );

  app.use( bodyParser() );
  app.use( methodOverride() );
};
