const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = 'mongodb+srv://tanwir1703:IG2aF6zxSi62O8RP@cluster0.vpjcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('ProfileDB');
    const UserCollection = database.collection('Users');

    // Middleware setup
    app.use(morgan('combined')); // Log HTTP requests
    app.use(bodyParser.json()); // Parse JSON request bodies
    app.use(cors()); // Enable CORS

    // Registration endpoint
    app.post('/register', async (req, res) => {
        const { name, email, password } = req.body;
  
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
  
        try {
          // Check if the user already exists
          const existingUser = await UserCollection.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: 'User already registered.' });
          }
  
          // Hash the password before saving it
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Create new user and save to MongoDB Users collection
          const newUser = { name, email, password: hashedPassword };
          await UserCollection.insertOne(newUser);

          const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
  
          return res.status(201).json({ message: 'User registered successfully', token});
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
  
      // Login endpoint
      app.post('/login', async (req, res) => {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required.' });
        }
  
        try {
          // Check if the user exists
          const user = await UserCollection.findOne({ email });
          if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
          }
  
          // Compare the provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
          }
  
          // Generate a JWT
          const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  
          return res.status(200).json({ message: 'Login successful', token, name: user.name, email: user.email });
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
  
    

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

startServer();