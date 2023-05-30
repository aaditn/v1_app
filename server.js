const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000; // Choose a port number for your backend server

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
const jdoodleClientId = 'd289200296d292f7c96d6dd3675b1381';
  const jdoodleClientSecret = '18ca5f9f6bf56ed08ab60cbad3cc0da2a1b5a2543c3e7fc7fad223426851ad77';

app.post('/execute', async (req, res) => {
  try {
    const { code } = req.body;

    const requestData = {
      script: code,
      language: 'java',
      versionIndex: '3',
      clientId: jdoodleClientId,
      clientSecret: jdoodleClientSecret,
    };

    const response = await axios.post('https://api.jdoodle.com/v1/execute', requestData);

    res.json(response.data);
  } catch (error) {
    console.error('Execution failed. Error:', error);
    res.status(500).json({ error: 'Execution failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
