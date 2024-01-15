import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./Routes/auth.js";
import dormitoryRouter from "./Routes/dormitorys.js";
import roomRouter from "./Routes/rooms.js";
import UserRouter from "./Routes/Users.js";
import HDRouter from "./Routes/hd.js";
import AdminRouter from "./Routes/admin.js"
import RoleRouter from "./Routes/roles.js"
import RoomdetailsRouter from "./Routes/roomdetail.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import httpStatus from "http-status";

import { errors } from "celebrate";
import { errorHandler } from "./Middlewares/errors.js";
import ApiError from "./Utils/ApiError.js";

const app = express();

dotenv.config();

var whitelist = ['http://localhost:8000', 'http://localhost:3000']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept'
  ]
};

app.use(cors(corsOptions));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Connect Mongo");
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("mongoDB disconnected!");
});

//middlewares
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/dormitorys", dormitoryRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/user", UserRouter);
app.use("/api/hd", HDRouter);
app.use("/api/role", RoleRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/roomdetails", RoomdetailsRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, "Endpoint Not found"));
});

// handle error
app.use(errorHandler);

// celebrate error handler
app.use(errors());

app.listen(8800, () => {
	connect();
	console.log("Connect BE");
});
