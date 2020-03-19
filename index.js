const express = require('express');
const app = express();
const morgan = require('morgan');
let users = [
    {id : 1, name : "Alice"},
    {id : 2, name : "bel"},
    {id : 3, name : "chris"}
];

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/users',(req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // '2'
    if(Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    //users array에서 id가 1인 객체를 찾아 배열로 반환
    if(Number.isNaN(id)) return res.status(400).end();
    //user.id와 같은 user가 없으면 undefined가 리턴된다.
    const user = users.filter(user => (user.id === id))[0];
    if(!user) return res.status(404).end();
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    //경로에 있는 값을 얻으려면 params . string으로 들어옴.
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();
})

app.post('/users', (req, res) => {
    const name = req.body.name;
    if( !name ) return res.status(400).end();
    
    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();
    
    const id = Date.now();
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
})
app.listen(3000, ()=> console.log('Server is running'));

module.exports = app;