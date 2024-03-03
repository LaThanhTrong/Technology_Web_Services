const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contacts.router');

const app = express();

const {
    resourceNotFound,
    handleError
} = require('./controllers/errors.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

app.use('/api/contacts', contactsRouter);
app.use(resourceNotFound);
app.use(handleError);

module.exports = app;