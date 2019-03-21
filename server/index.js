const express = require('express')
const app = express()
const router = require('./router.js')
const bodyParser = require('body-parser');
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));

app.use('/openforce', router)

app.listen(port, () => console.log(`Openforce app listening on port ${port}!`))