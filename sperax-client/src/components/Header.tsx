import { useEffect } from "react";
import logo from "../assets/logo.svg";
import { useWeb3 } from "../contexts/Web3Context";
import { Link } from "react-router-dom";

const Header = () => {
  const { connectWallet, setWalletAddress, walletAddress } = useWeb3();

  const handleWalletConnection = async () => {
    try {
      const wallet = await connectWallet();
      setWalletAddress(wallet);
      localStorage.setItem("wallet", wallet);
      console.log(wallet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    setWalletAddress(wallet!);
  }, [setWalletAddress]);

  return (
    <header className="px-1 md:px-24 lg:px-32 py-3 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center gap-2 md:gap-5">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>

        <Link
          to={"/wallet-balance"}
          className="text-xs md:text-sm font-medium cursor-pointer"
        >
          Token balance
        </Link>
        <Link
          to={"/transfer"}
          className="text-xs md:text-sm font-medium cursor-pointer"
        >
          Send Token
        </Link>
      </div>

      {walletAddress && (
        <div className="p-0.5 bg-[#a75bca] rounded-3xl">
          <p className="p-1.5 text-xs font-medium bg-[#F9FBFA] rounded-3xl">{`${walletAddress?.slice(
            0,
            5
          )}*****${walletAddress?.slice(-5)}`}</p>
        </div>
      )}

      {!walletAddress && (
        <button
          onClick={handleWalletConnection}
          className="px-4 py-2 w-max min-w-max text-white font-semibold text-xs md:text-sm rounded-3xl bg-[#9B31CD]"
        >
          Connect wallet
        </button>
      )}
    </header>
  );
};

export default Header;
