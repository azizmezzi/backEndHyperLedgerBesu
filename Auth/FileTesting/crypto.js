var crypto = require('crypto');
const algorithm = 'aes-256-ctr';


decrypt=function(text,password){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
    }
    
console.log(decrypt("2bd5489478421aaaf093a94cf6eb132a02ba7c19d9eeff96800b991783df67e9e43673831264e415fced3a4b617a5678bf8573407fd7d5f51a209d78801abf974c98","0xC89faF3630DA534816a0fca0E5E208455531034b"));
