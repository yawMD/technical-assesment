require('dotenv').config();
const dbConnection = require('./db/dbConnection');
const app = require('./server');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

dbConnection(mongoUri);

app.listen(port, () => console.log(`Server running on port ${port}`));