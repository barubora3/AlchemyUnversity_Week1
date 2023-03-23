import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

export function getAddress(publicKey) {
  return "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));
}
