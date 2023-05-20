const crypto = require("crypto");
const { writeFileSync } = require("fs");
//console.log(process.argv[3])

//RSA COMMON ALGORITHM  WAY TO CREATE  KEY tHERE IS ALSA DSA
const key = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096, //bits
  publicKeyEncoding: {
    type: "pkcs1", //public key criptograffy stadrds
    format: "pem", //most common  format choise
  },
  privateKeyEncoding: {
    type: "pkcs1", //private key criptograffy stadrds
    format: "pem", //most common  format choise
  },
});
writeFileSync(`config/keys/public.pem`, key.publicKey);
writeFileSync(`config/keys/private.pem`, key.privateKey);
