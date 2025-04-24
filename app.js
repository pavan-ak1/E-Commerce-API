require("dotenv").config();
require('express-async-errors');

const express = require("express");
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')
// Database Connection
const connectDb = require("./db/connectDb");

// Routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
// const userRoutes = 

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'))
app.use(cors());



// Basic route



app.get("/api/v1/", (req, res) => {
  console.log(req.signedCookies);
  
  res.send("My E-commerce API");
});

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/products', productRoutes)


//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
