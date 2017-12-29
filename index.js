const express = require('express'),
app = express();
var search = require('../DarwinLabsTask/api/controllers/searchController');

app.route('/').get(search.showHomePage);
app.get('/history', (req, res) => res.send('Hello World!'));
app.get('/details/:keyword', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))