const express = require('express');
const fs = require('fs');
const url = '/';
const app = express();
app.get(url, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
    res.send('HELLO')
})

app.listen(3000);