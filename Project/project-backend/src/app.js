const express = require('express');
const cors = require('cors');
const shoesRouter = require('./routes/shoes.router');
const usersRouter = require('./routes/users.router');
const brandsRouter = require('./routes/brands.router');
var session = require('express-session');
const multer = require('multer');

const { SESSION_SECRET } = process.env;
const app = express();

const {
    resourceNotFound,
    handleError,
} = require('./controllers/errors.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use('/api/shoes', shoesRouter);
app.use('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
})
app.use('/api/users', usersRouter);
app.use('/api/brands', brandsRouter);
app.use(resourceNotFound);
app.use(handleError);

module.exports = app;