import { useEffect } from "react";
import "./App.css";
import GetWalletBalance from "./components/GetWalletBalance";
import { useWeb3 } from "./contexts/Web3Context";

function App() {
  const { connectWallet } = useWeb3();

  useEffect(() => {
    (async () => {
      await connectWallet();
    })();
  }, []);

  return (
    <div className="text-5xl">
      <GetWalletBalance />
    </div>
  );
}

export default App;
