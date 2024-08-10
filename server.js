const express = require("express");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

connectDB()

// Middleware
app.use(express.json());

// Routes

app.use('/api/contacts', require("./routes/contactroute"));
app.use('/api/users', require("./routes/userroute"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
