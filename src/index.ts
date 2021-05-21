require('dotenv').config();

import express, { Request, Response} from 'express';
import mongoose from 'mongoose';
import UserAPI from './apis/user-api';
import socket from './socket-services/root-socket-service';

const server = express();
const port = 3003;
const http = require('http').createServer(server);
const io = require('socket.io');

var bodyParser = require('body-parser');
server.use(bodyParser.json()); // to support JSON-decoded bodies
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json()); // to support JSON-encoded bodies

server.use(function (_: Request, res: Response, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

mongoose.connect(
    process.env.MONGO_URL || "mongodb+srv://conrongvang:P@$$w0rd@cluster0.xahx1.mongodb.net/chat-box?retryWrites=true&w=majority", 
    {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected to database");
	server.use('/', [UserAPI]);
    io(http).on("connection", socket);
});

http.listen(port, () => {
    console.log(`Server started at http://localhost:${ port }`);
});