const mongoose = require('mongoose');

const dbConnection = async (dbUri) => {
    try {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log('Error connecting to database: ', error);
        process.exit(1);
    }
};


module.exports = dbConnection;
