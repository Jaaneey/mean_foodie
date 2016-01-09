var express = require("express"),
    app = express(),
    morgan = require("morgan"),
    path = require("path");

//MIDDLEWARE
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/css',express.static(path.join(__dirname, '../client/css')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));
app.use(bodyParser.json());


app.get('*', function(req, res) {
res.sendFile(path.join(__dirname, "../client", "index.html"));
});



var PORT = 3000;
app.listen(PORT, function() {console.log("Listening on localhost:", PORT);});