require('dotenv').config();
const crpyto = require('crypto');
const aes = "aes-128-cbc";

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

if (!process.env.SECRET_KEY) {
    throw new Error('Key is not defined');
}

function encrypt(text){

    const iv = crpyto.randomBytes(16);

    const cipher = crpyto.createCipheriv(aes, secretKey, iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
    
}

function decrypt(encryption){
    const [ivHex, encrypted] = encyption.splot(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(aes, secretKey, iv);

    let decrypted = decipher.update(encryption, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted
}


module.exports = { encrypt, decrypt};