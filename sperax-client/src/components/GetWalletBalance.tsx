import { useState } from "react";
import { isAddress } from "web3-validator";
import { useWeb3 } from "../contexts/Web3Context";
import loading_icon from "../assets/loader.svg";

const GetWalletBalance = () => {
  const { connectContract } = useWeb3();
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [resError, setResError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetBalance = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isAddress(address)) {
        const newContract = connectContract();

        const balance = await newContract?.methods.getBalance(address).call();
        setBalance(balance);
      } else {
        setFormError("Enter a valid ethereum address");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (error?.message.toLowerCase().includes("gas")) {
        setResError(
          "You do not have enough gas fee to perform this transaction"
        );
      } else {
        setResError("An error occured, try again");
      }

      setTimeout(() => {
        setResError("");
      }, 5000);
    }
  };

  return (
    <div className="m-auto w-full h-[80%] md:w-[500px] flex flex-col justify-center">
      <h3 className="text-center font-semibold text-2xl mb-2">
        Des Token Balance
      </h3>
      <div className="w-full bg-transparent px-5 py-4 flex justify-between border-t border-b my-4">
        <p className="text-sm font-medium">Token balance</p>
        <p className="text-sm font-medium">{balance || "0.00"}</p>
      </div>
      <form
        onSubmit={(e) => handleGetBalance(e)}
        className="w-full h-[210px] bg-white shadow-md rounded-2xl px-5 py-2 flex flex-col justify-around gap-1"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Ethereum Address</label>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setFormError("");
            }}
            className={`${
              formError ? "border-red-700" : "border-[#00000033]"
            } text-sm bg-[#F9FBFA] outline-none border h-[40px] w-full p-2 rounded-lg`}
          />
          {formError && (
            <p className="font-medium text-xs text-red-700">{formError}</p>
          )}
        </div>

        {resError && (
          <p className="font-medium px-2 py-3 text-xs bg-red-50 text-red-700 rounded-lg">
            {resError}
          </p>
        )}

        <button
          type="submit"
          className="h-[40px] p-1 bg-[#9B31CD] text-sm font-semibold text-white rounded-3xl mt-4 mb-7 flex justify-center items-center"
        >
          {loading ? (
            <img src={loading_icon} alt="" className="w-7" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default GetWalletBalance;
