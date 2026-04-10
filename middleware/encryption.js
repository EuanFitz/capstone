require('dotenv').config();
const crypto = require('crypto');
const aes = "aes-128-cbc";

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

if (!process.env.SECRET_KEY) {
    throw new Error('Key is not defined');
}

function encrypt(text){

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(aes, secretKey, iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted; // String is returned like iv:         gsgsgsdgsdgsdgsdg:n12kj34n1k23n123
}

function decrypt(encryption){                   
                                        
    const parts = encryption.split(':');     
    //if somethings not encrypted it wont have 2 parts therefore just return the item
    if (parts.length !== 2) return encryption;  

    const [ivHex, encrypted] = encryption.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(aes, secretKey, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted
}


module.exports = { encrypt, decrypt};