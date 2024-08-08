import "./App.css";
import GetWalletBalance from "./components/GetWalletBalance";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SendToken from "./components/SendToken";
import { lazy, Suspense } from "react";

const SendTokenModal = lazy(() => import("../src/components/SendTokenModal"));

function App() {
  return (
    <div className="h-screen w-screen bg-[#F9FBFA] p-2 overflow-hidden">
      <Suspense>
        <SendTokenModal />
      </Suspense>
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
