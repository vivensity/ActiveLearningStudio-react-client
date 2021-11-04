/* eslint-disable */
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, './build')));
app.get('/*', (req, res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace('<title>CurrikiStudio</title>', `<title>${process.env.META_IMAGE}</title>`);
    data = data.replace(/__META_IMAGE__/g, process.env.META_IMAGE);

    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
