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
const socketio = require('socket.io');
const http = require('http');

require('./config/passport/index');

const index = require('./routes/index');
const api = require('./routes/api');
const auth = require('./routes/auth');

const port = 4000;
const dbUrl = "mongodb://localhost/socialNetwork";
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

const app = express();

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


const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.emit('welcome', `Welcome to our chat ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
});

app.use('/api', api);
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

server.listen(port, err => err ? console.log(err) : console.log(`Server is listening port ${port}`));



// client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//         client.emit('timer', new Date());
//     }, interval);
// });