var express = require("express"),
    app = express(),
    morgan = require("morgan"),
    path = require("path");


app.get('*', function(req, res) {
res.sendFile(path.join(__dirname, "../client", "index.html"));
});



var PORT = 3000;
app.listen(PORT, function() {console.log("Listening on localhost:", PORT);});