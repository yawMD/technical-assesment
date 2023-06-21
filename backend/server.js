const express = require('express');
const taskRouter = require('./routes/taskRouter');
const cors = require("cors");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({
        status: 'error',
        message,
        data
    });
});
app.use('/api/v1/', taskRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;