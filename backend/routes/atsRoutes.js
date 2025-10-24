const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/score', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = path.resolve(req.file.path);

  try {
    const py = spawn('python3', ['python_nlp_service/modules/ats_scorer_runner.py', filePath]);

    let result = '';
    py.stdout.on('data', (data) => {
      result += data.toString();
    });

    py.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
    });

    py.on('close', (code) => {
      fs.unlinkSync(filePath); 
      if (code !== 0) return res.status(500).json({ error: 'Python script failed' });
      res.json(JSON.parse(result));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
