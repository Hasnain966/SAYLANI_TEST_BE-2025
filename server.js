const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Initialize express app
const app = express();  // Add this line before using app

dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});