const fs = require('fs');
const request = require('request');

const voice = (req, res) => {
    const client_id = process.env.API_KEY_ID;
    const client_secret = process.env.API_KEY;
    var api_url = 'https://naveropenapi.apigw.ntruss.com/voice-premium/v1/tts';
    
    var options = {
        url: api_url,
        form: { speaker: 'nara', volume: '0', speed: '0', pitch: '0', emotion: '0', text: '3/27~3/20', format: 'mp3' },
        headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
    };
    var writeStream = fs.createWriteStream('./tts1.mp3');
    var _req = request.post(options);
    _req.pipe(writeStream); // file로 출력
    _req.pipe(res); // 브라우저로 출력
}

module.exports = { voice };