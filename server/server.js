require("dotenv").config();
//const jsonServer = require("json-server");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));


//app.use(isAuthenticated);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use('/auth', authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use('/api', userRoutes);
//app.get("/api/users/:id" )

const postRoutes = require("./routes/postRoutes");
app.use('/api', postRoutes);


const { isAuthenticated, jwtErrorHandler } = require("./middleware/jwt.middleware");
const errorHandler = require("./middleware/errorHandler");

app.use(jwtErrorHandler);
app.use(errorHandler);

// Allow requests from the front end
/* const FRONT_END_URL = process.env.FRONT_END_URL;
const allowedOrigins = [FRONT_END_URL]; // Replace with your frontend URLs
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  preflightContinue: false 
})); 
 */
/* app.use(cors({
  allowedHeaders: ['Authorization'], // Allow authorization header
})); */
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
 };
 
 app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
}); 

