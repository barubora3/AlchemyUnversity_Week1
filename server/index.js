const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0xb72c74d230ab05a5bd1fcd42d0022f0b41ef11d3": 100, // dan
  "0x9756e4b1d4ca53e384ec36da4dd7cc4c48e11ee0": 75, // al
  "0x88be715827caf62a8cf6576919a1a3bc673cd298": 50, // ben
};

let nonces = {
  "0xb72c74d230ab05a5bd1fcd42d0022f0b41ef11d3": 0, // dan
  "0x9756e4b1d4ca53e384ec36da4dd7cc4c48e11ee0": 0, // al
  "0x88be715827caf62a8cf6576919a1a3bc673cd298": 0, // ben
};

app.get("/nextNonce/:address", (req, res) => {
  const { address } = req.params;
  const nonce = nonces[address] + 1;
  res.send({ nonce });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, nonce, hash, sig, recoveryBit } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const signature = Uint8Array.from(Object.values(sig));

  const publicKey = secp.recoverPublicKey(hash, signature, recoveryBit);
  const address = "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));
  const isValid = secp.verify(signature, hash, publicKey);
  if (address !== sender || isValid === false) {
    res.status(400).send({ message: "Invalid Signature" });
  } else if (nonce <= nonces[sender]) {
    res.status(400).send({ message: "Invalid Nonce" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender], incremetedNonce: nonces[sender]++ });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
