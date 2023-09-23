// Auth and weather APIs

import express, { json } from 'express';
import { run, get } from './db';

const app = express();
app.use( json() );

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Auth APIs

app.post('/register', async (req, res) => {
  // Register user
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashed], 
    error => {
      if (error) {
        return res.status(400).json({error: 'Email already in use'});
      }

      // Send verification email
      
      res.json({message: 'Registration successful!'});
  });

});



app.post('/login', async (req, res) => {
  // Login user 

  const { email, password } = req.body;

  // Find user by email
  const user = await get('SELECT * FROM users WHERE email = ?', [email]);

  if (!user) {
    return res.status(401).json({error: 'Invalid credentials'});
  }

  // Check password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({error: 'Invalid credentials'});
  }

  // Create JWT
  const token = jwt.sign({userId: user.id}, 'secretkey');

  // Send token
  res.json({token});


});

// Weather API

app.get('/weather', async (req, res) => {
  // Call weather API
  const data = await axios.get(`${WEATHER_API_URL}/current?key=${WEATHER_API_KEY}&...`);
  
  res.json(data);
} );

app.listen( 3000 );