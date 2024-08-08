import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useWeb3 } from "../contexts/Web3Context";
import logo from "../assets/logo.svg";
import arrow_icon from "../assets/arrow-right.svg";
import cancel_icon from "../assets/cancel-icon.svg";
import loading_icon from "../assets/loader.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
  },
};

const SendTokenModal = () => {
  const {
    modalIsOpen,
    setModalIsOpen,
    amount,
    recipient,
    walletAddress,
    web3,
    setAmount,
    setRecipient,
    connectContract,
  } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string>("");

  const closeModal = () => {
    localStorage.setItem("modal_open", "0");
    setModalIsOpen(0);
  };

  const handleTokenTransfer = async () => {
    try {
      setLoading(true);
      const newContract = connectContract();

      if (walletAddress) {
        const amountInWei = web3?.utils.toWei(amount, "ether");
        await newContract.methods
          .sendToken(recipient, amountInWei)
          .send({ from: walletAddress });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.message
          ?.toLowerCase()
          ?.includes("user denied transaction signature")
      ) {
        setResError("Transaction was not approved");
      } else {
        setResError("Transaction could not be completed, try again");
      }

      setTimeout(() => {
        setResError("");
      }, 10000);
    }
  };

  useEffect(() => {
    const modalOpen = localStorage.getItem("modal_open");
    const amount = localStorage.getItem("token_amount");
    const recipient = localStorage.getItem("recipient");

    if (modalOpen !== null) {
      setModalIsOpen(Number(modalOpen));
    }

    setAmount(amount!);
    setRecipient(recipient!);
  }, [setAmount, setModalIsOpen, setRecipient]);

  return (
    <Modal
      isOpen={modalIsOpen === 1}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Send Token"
    >
      <div className="relative w-[90vw] md:w-[370px] h-[400px] bg-white shadow-lg rounded-2xl flex flex-col gap-1 py-5 px-12">
        <div className="flex flex-col gap-3 items-center">
          <img src={logo} alt="" className="w-10" />
          <p className="md:text-xl text-center font-bold">{`${amount} TKN`} </p>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium">{`${walletAddress?.slice(
              0,
              4
            )}...${walletAddress?.slice(-4)}`}</p>
            <img src={arrow_icon} alt="" className="h-4" />
            <p className="text-xs font-medium">{`${recipient?.slice(
              0,
              4
            )}...${recipient?.slice(-4)}`}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-1">
          <div className="flex justify-between gap-4 mt-7">
            <p className="text-sm font-medium">Amount</p>
            <p className="text-sm font-medium text-gray-400">{`${amount} TKN`}</p>
          </div>
          <div className="w-full">
            {resError && (
              <p className="font-medium px-2 py-3 text-xs bg-red-50 text-red-700 rounded-lg">
                {resError}
              </p>
            )}

            <button
              onClick={handleTokenTransfer}
              className="w-full h-[40px] p-1 bg-[#9B31CD] text-sm font-semibold text-white rounded-3xl mt-4 mb-7 flex justify-center items-center"
            >
              {loading ? (
                <img src={loading_icon} alt="" className="w-7" />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>

        <div
          onClick={closeModal}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 cursor-pointer"
        >
          <img src={cancel_icon} alt="" className="w-5" />
        </div>
      </div>
    </Modal>
  );
};

export default SendTokenModal;
