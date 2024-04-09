require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const { isAuthenticated, jwtErrorHandler } = require("./jwt.middleware");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

app.use(isAuthenticated);

// Routes
app.use('/auth', authRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/posts', isAuthenticated, postRoutes);

app.use(jwtErrorHandler);
app.use(errorHandler);


server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
}); 

/* const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.use(middlewares);
server.use(morgan("dev"));

server.use(router);
*/