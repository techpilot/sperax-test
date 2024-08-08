import { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import logo from "../assets/logo.svg";

const SendToken = () => {
  const { web3, walletAddress, contract } = useWeb3();

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [addressErr, setAddressErr] = useState<string>("");
  const [amountErr, setAmountErr] = useState<string>("");
  const [resError, setResError] = useState<string>("");

  const handleTokenTransfer = async () => {
    try {
      if (contract && walletAddress) {
        const amountInWei = web3?.utils.toWei(amount, "ether");
        await contract.methods
          .sendToken(recipient, amountInWei)
          .send({ from: walletAddress });
        console.log("sent");
      }
    } catch (error) {
      console.log(error);
      setResError("an error occured");
    }
  };

  return (
    <div className="m-auto w-full h-[80%] md:w-[400px] flex flex-col justify-center">
      <div className="w-full h-[400px] bg-white shadow-md rounded-2xl flex flex-col gap-1">
        <p className="text-sm md:text-base text-center text-[#B2B2B2] font-medium p-3">
          Des Token
        </p>
        <div className="w-full bg-transparent px-5 py-3 flex justify-center items-center border-y gap-2">
          <img src={logo} alt="" className="w-5" />
          <p className="text-sm md:text-base text-center font-semibold">
            {"0.00 TKN"}{" "}
            <span className="text-gray-500 font-normal">available</span>
          </p>
        </div>
        <form className="flex-1 flex flex-col justify-between gap-1 p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Send to</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setAddressErr("");
                }}
                className={`${
                  addressErr ? "border-red-700" : "border-[#00000033]"
                } text-sm bg-[#F9FBFA] outline-none border h-[40px] w-full p-2 rounded-lg`}
              />
              {addressErr && (
                <p className="font-medium text-xs text-red-700">{addressErr}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Amount</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountErr("");
                }}
                className={`${
                  amountErr ? "border-red-700" : "border-[#00000033]"
                } text-sm bg-[#F9FBFA] outline-none border h-[40px] w-full p-2 rounded-lg`}
              />
              {amountErr && (
                <p className="font-medium text-xs text-red-700">{amountErr}</p>
              )}
            </div>

            {resError && (
              <p className="font-medium px-2 py-3 text-xs bg-red-50 text-red-700 rounded-lg">
                {resError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="h-[40px] p-1 bg-[#9B31CD] text-sm font-semibold text-white rounded-lg mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendToken;
