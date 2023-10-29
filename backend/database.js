const mysql = require('mysql');
const dbStructure = require('./db.json');
const secrets = require('./secrets.json');

const DB_HOST = 'localhost';
const DB_NAME = 'myfinancial';

let _instance;

const executeAsyncSql = async (sql) => {
    const conn = getConenction();
    return new Promise((resolve, reject) => {
        conn.query(sql, [], function(err) {
            if (err) reject(err);
            resolve();
        });
    });
}

const executeAsyncQuery = async (query, params) => {
    const conn = getConenction();
    return new Promise((resolve, reject) => {
        conn.query(query, params, (err, results) => {
            if (err) reject(err);
            resolve(results);
          });    
    });
}

const rebuildDatabase = async () => {
    dbStructure.sort(function(a, b){return a.order - b.order});
    for (let i = 0; i< dbStructure.length; i++){
        const step = dbStructure[i];
        const {command, sql} = step;
        console.log('--- ' + command);
        await executeAsyncSql(sql.join(''));
    }
}

const getConenction = () => {
    if (!_instance){
        _instance = mysql.createConnection({
            host: DB_HOST,
            user: secrets.db_user,
            password: secrets.db_password,
            database: DB_NAME
        });
        _instance.connect();
    }
    return _instance;
}

const db = {
    getConenction,
    rebuildDatabase,
    executeAsyncQuery
}

module.exports = db;
