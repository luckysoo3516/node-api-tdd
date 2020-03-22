const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    {dialect: 'sqlite',
    storage : './db.sqlite',
    logging : false
});
// dialect는 사용할 db, storage는 db가 있는 곳

const User = sequelize.define('User', {
    name : {
        type : Sequelize.STRING,
        unique : true
    }
})

module.exports = { Sequelize, sequelize, User }