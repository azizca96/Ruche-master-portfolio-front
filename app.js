const path = require('path');
var fs = require("fs");
var host = "127.0.0.1";
var port = 3000;
var express = require("express");

var app = express();
app.use(express.static(path.join(__dirname, 'dist/ruche/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ruche/index.html'));
});
app.get("/xx", function (request, response) { //root dir
  response.send("Hello!!");
});

app.listen(port, host)
