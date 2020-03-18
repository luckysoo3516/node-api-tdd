const express = require('express');
const app = express();
const morgan = require('morgan');
let users = [
    {id : 1, name : "Alice"},
    {id : 2, name : "bel"},
    {id : 3, name : "chris"}
];

app.use(morgan('dev'));

app.get('/users',(req, res) => {
    res.json(users);
});

app.listen(3000, ()=> console.log('Server is running'));