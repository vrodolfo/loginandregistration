const express     = require('express');
const app         = express();
const path        = require("path");
const bodyParser  = require('body-parser');
const session     = require('express-session');
const mongoose    = require('./server/config/mongoose.js');
const indexRouter = require('./server/routes/index');

app.set('views', path.join(__dirname, './client/views'));
app.use( express.static(path.join(__dirname, './client/static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/', indexRouter);

indexRouter(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
