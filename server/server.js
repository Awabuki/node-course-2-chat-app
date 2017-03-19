// Built in node module to work with paths, instead of using "../" to back up
// module called PATH that comes with node
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT||3000; 

//console.log(__dirname + '/../public');  // goes in and out
//console.log(publicPath);  // goes directly to public

var app = express();


app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

//module.exports = {app};
