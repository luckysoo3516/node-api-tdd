const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    {dialect: 'sqlite',
    storage : './db.sqlite'
});
// dialect는 사용할 db, storage는 db가 있는 곳

const User = sequelize.define('User', {
    name : Sequelize.DataTypes.STRING
})

module.exports = { Sequelize, sequelize, User }