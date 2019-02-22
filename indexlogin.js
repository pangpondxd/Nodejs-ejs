var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extend: false})
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000}, resave : false, saveUninitialized:false}))
app.get('/', function(req, res) {
   res.render('index')
})
app.get('/admin', function(req, res, next) {
    var sess = req.session
    if(sess.views){
        sess.views++
        res.render('')
    }else{
        sess.views = 1
        res.render('admin')
    }
    console.log(sess.views)
    next();
})

app.post('/add', urlencodedParser, function(req, res) {
    var result = parseInt(req.body.a) + parseInt(req.body.b)
    res.send('Result = ' + result)
})

app.listen(8000)