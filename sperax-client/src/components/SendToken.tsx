import { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import logo from "../assets/logo.svg";
import { isAddress } from "web3-validator";

const SendToken = () => {
  const {
    setModalIsOpen,
    amount,
    recipient,
    setAmount,
    setRecipient,
    setContract,
  } = useWeb3();

  const [addressErr, setAddressErr] = useState<string>("");
  const [amountErr, setAmountErr] = useState<string>("");

  // validates the form and opens the send token modal for
  // confirming the transfer details before initiating the transfer
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!recipient) {
      setAddressErr("Enter recipient's address");
      return;
    }
    if (!amount) {
      setAmountErr("This field is required");
      return;
    }

    if (isAddress(recipient)) {
      localStorage.setItem("modal_open", "1");
      setModalIsOpen(1);
    } else {
      setAddressErr("Enter valid ethereum address");
    }
  };

  useEffect(() => {
    const contract = JSON.parse(localStorage.getItem("contract")!);
    setContract(contract);
  });

  return (
    <div className="m-auto w-full h-[100%] md:w-[400px] flex flex-col justify-center">
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
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex-1 flex flex-col justify-between gap-1 p-5"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Send to</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  localStorage.setItem("recipient", e.target.value);
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
                  localStorage.setItem("token_amount", e.target.value);
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
          </div>

          <button
            type="submit"
            className="h-[40px] p-1 bg-[#9B31CD] text-sm font-semibold text-white rounded-3xl mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendToken;
