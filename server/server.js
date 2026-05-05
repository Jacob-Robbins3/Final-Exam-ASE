require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); 
app.use(express.json()); 

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB: PlayerCard Database Active'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1); 
    });

app.get('/', (req, res) => res.send('<h1>PlayerCard API is Running</h1>'));
app.get('/favicon.ico', (req, res) => res.status(204).end());

try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/profile', require('./routes/profile'));
    console.log('Routes loaded successfully');
} catch (error) {
    console.error('Route Loading Error:', error.message);
}

app.use((err, req, res, next) => {
    console.error('Internal Server Error Stack:', err.stack);
    res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
