const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');


const check = async (req) => {

    return new Promise((resolve, reject) => {
        try{
            const token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, secrets.jwt, (err, decoded) => {
                if (err) resolve(-1);
                resolve(decoded.id);
            });
        }
        catch(e){
            resolve(-1);
        }
    });
}


const checkAuth = {
    check
}

module.exports = checkAuth;