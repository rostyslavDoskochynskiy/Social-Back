const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStorage = require('connect-mongo')(session);
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require("cors");

//
const expHbs = require('express-handlebars');
//

require('./config/passport/index');

const passportMiddleware = require("./middleware/passport");
const index = require('./routes/index');
const api = require('./routes/api');
const auth = require('./routes/auth');

const port = 4000;
const dbUrl = "mongodb://localhost/socialNetwork";
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

const app = express();

//
const views = path.join(__dirname, 'views');
app.engine('.hbs', expHbs({defaultLayout: path.join(views, 'layouts', 'main.hbs')}));
app.set('view engine', '.hbs');
app.set('views', views);
//

app.use(cors());
app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStorage({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', passportMiddleware.isLoggedIn, api);
app.use('/auth', auth);
app.use('/', index);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
});

app.listen(port, err => err ? console.log(err) : console.log(`Server is listening port ${port}`));