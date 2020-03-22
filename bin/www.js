const app = require('../index');
const syncDB = require('./sync-db');
// 서버가 리슨하기 전에 db 싱크
syncDB().then( _ => {
    console.log('Sync Database!');
    app.listen(3000, () => console.log('Server is Running on 3000 port'));
});