//to generate a public key from a private key

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const createKeys = () => {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    return {private: privateKey, public: publicKey}
}

export {createKeys};