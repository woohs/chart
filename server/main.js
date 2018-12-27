const express = require('express');
const path = require('path');
const app = express();


const url = path.resolve(__dirname, '../build');

app.use(express.static(url));

app.listen(8000, () => {
  console.log('Example app listen 8000');
})