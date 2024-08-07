import { useEffect } from "react";
import "./App.css";
import GetWalletBalance from "./components/GetWalletBalance";
import { useWeb3 } from "./contexts/Web3Context";

function App() {
  const { connectWallet } = useWeb3();

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#F9FBFA] p-2">
      <GetWalletBalance />
    </div>
  );
}

export default App;
