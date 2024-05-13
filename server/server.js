/* global process*/
import connectDB from './configs/db.config.js';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import Routers from './routes/index.route.js';
//create server using express
const app = express();
const server = http.createServer(app);

//port number
dotenv.config();

// console.log(process.env.PORT)
const port = String(process.env.PORT); // process.env.PORT;

app.use(cors());

app.use(express.json({ limit: '10mb' }));

//read request body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

//footprint of request
app.use(morgan('dev'));

//Route use

Routers(app);

app.all('*', (req, res) => {
    res.status(404).json({
        message: 'Not found'
    });
});

//start server
connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
