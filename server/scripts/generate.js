const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log("private key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("public key:", toHex(publicKey));

const address = "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));

console.log("address:", address);

/*

private key: 45b848f7bbead63f601e219865856f073919029e7bcaec880400f9e49db0c6ff
public key: 048e8744294a245210b604475c2fb39bf572660cb737110fce9eefd1d1e2ede289888a63c05414abeca75bc37a0cb180aa9b23af3d38774ecaaf4d822e946329bb
address: 0xb72c74d230ab05a5bd1fcd42d0022f0b41ef11d3

private key: fb44e31dc07d65450f3dfbfe1ca5f2e05ca5467641c71a271130f06629c93f06
public key: 04f6968909264f7cee2e51426a610030274f7f7127d3169b80a834ec7e8c6146b07cc0725babe99a9c8e8529ec7999b3253ee0ff32f15e86556aa4e7b4ce11b450
address: 0x9756e4b1d4ca53e384ec36da4dd7cc4c48e11ee0

private key: 1e60827f1855899837ddad7d8c14a941e6b2be95ec93fdbf249f4dc5c7250bb8
public key: 0479c511089450374998a93829d7bb82b355f9295e565de1e6aabc7c55526be89d4ead8c0a1a7250dcf0ee4a02df2a135116dc376d8a9b70c399f32cf0bc9892c8
address: 0x88be715827caf62a8cf6576919a1a3bc673cd298

*/
