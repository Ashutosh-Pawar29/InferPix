const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { spawn } = require('child_process');

const app = express()
app.use(bodyParser.json());
app.use(cors())
app.get('/tkn',function(req,res){
    const ip = req.ip;
    const tkn = jwt.sign({user:ip},"123456789")
    console.log(ip)
    res.json({token:tkn})
})


app.post('/generate', (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  const python = spawn('python', ['a.py', prompt]);

  let outputPath = '';

  python.stdout.on('data', (data) => {
    outputPath += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      const imagePath = outputPath.trim();
      res.sendFile(path.resolve(__dirname, imagePath));
    } else {
      res.status(500).send('Image generation failed');
    }
  });
});


app.listen(3000)
