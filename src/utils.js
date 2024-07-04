/*const crypto = require('crypto');


const SECRET = "Com_53110";
const creaHash = password => crypto.createHmac("sha256", SECRET).update(password).digest("hex");

module.exports.creaHash = creaHash;*/

const bcrypt = require('bcrypt');

const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const validaPassword = (password, passwordConHash) => bcrypt.compareSync(password, passwordConHash);

module.exports = {
    generaHash,
    validaPassword
};