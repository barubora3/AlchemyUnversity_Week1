import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        publicKey={publicKey}
        setPublicKey={setPublicKey}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        publicKey={publicKey}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
