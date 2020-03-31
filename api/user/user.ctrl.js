// api의 로직.
const models = require('../../models');
// const bent = require('bent');


// sequelize 는 Promise객체로 리턴하기 떄문에 반드시 then으로 받아줘야함
const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // req는 다 string임.
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    // 데이터 조회
    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        });
};

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    //users array에서 id가 1인 객체를 찾아 배열로 반환
    if (Number.isNaN(id)) return res.status(400).end();
    //user.id와 같은 user가 없으면 undefined가 리턴된다.
    models.User.findOne({
        where: { id }
    }).then(user => {
        if (!user) return res.status(404).end();
        res.json(user);
    })
};

const destroy = (req, res) => {
    //경로에 있는 값을 얻으려면 params . string으로 들어옴.
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    models.User.destroy({
        where: { id }
    }).then(() => res.status(204).end());
};

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    //if (isConflict) return res.status(409).end();
    models.User.create({ name })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    // if(isConflict) return res.status(409).end();    
    // if(!user) return res.status(404).end();

    models.User.findOne({ where: { id } })
        .then(user => {
            if (!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(_ => {
                    res.json(user);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                })
        })
}



module.exports = { index, show, create, destroy, update }