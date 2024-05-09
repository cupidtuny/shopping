const connectDB = require('./configs/db.config');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require("morgan");
const http = require('http');
const cors = require('cors');
//create server using express
const app = express();
const server = http.createServer(app);

//port number
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({ limit: "10mb" }));

//read request body to json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

//footprint of request
app.use(morgan("dev"));

//Route use

require('./routes/index.route')(app);

app.all("*", (req, res, next) => {
    res.status(404).json({
        message: "Not found",
    });
});

//start server
connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})