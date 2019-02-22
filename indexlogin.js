var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000}, resave : false, saveUninitialized:false}))
app.use(function(req, res, next) {
    var sess = req.session
    if(sess.views){
        sess.views++
    }else{
        sess.views = 1
    }
    console.log(sess.views)
    next();
})
app.get('/', function(req, res) {
   res.send('Hello XX')
})
app.get('./admin', function(req, res) {
    var sess = req.session
    if(sess.views){
        res.render('Hello')
    }else{
        sess.views = 1
        res.render('Please log in')
    }
    console.log(sess.views)
    next();
})

app.listen(8000)