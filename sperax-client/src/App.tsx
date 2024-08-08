import "./App.css";
import GetWalletBalance from "./components/GetWalletBalance";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SendToken from "./components/SendToken";

function App() {
  return (
    <div className="h-screen w-screen bg-[#F9FBFA] p-2 overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<GetWalletBalance />} />
        <Route path="wallet-balance" element={<GetWalletBalance />} />
        <Route path="transfer" element={<SendToken />} />
      </Routes>
    </div>
  );
}

export default App;
