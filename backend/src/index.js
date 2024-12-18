if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: './src/config/.env',
    });
}

const connectDatabase = require('./DB/database');
const app = require('./app');
const PORT = process.env.PORT;

const server = app.listen(PORT, async () => {
    connectDatabase();
    console.log('The Serever is running on Port:8080 URL: http://localhost:8080');
})