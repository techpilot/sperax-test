import React, { useState, useEffect, ReactNode } from "react";
import Web3 from "web3";
import DesTokenContract from "../contracts/DesToken.json";
import { Web3Context } from "./Web3Context";

const ContractContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [balance, setBalance] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else if (window.web3) {
      const web3Instance = new Web3(window.web3.currentProvider);
      setWeb3(web3Instance);
    } else {
      console.log(
        "No Ethereum detected in your browser. You should consider trying MetaMask!"
      );
    }
  }, []);

  const connectWallet = async () => {
    const web3Instance = new Web3(window?.ethereum);
    const accounts = await web3Instance.eth.requestAccounts();
    setWalletAddress(accounts[0]);
    const networkId = await web3Instance.eth.net.getId();

    const contractInstance = new web3Instance.eth.Contract(
      DesTokenContract.abi,
      DesTokenContract.address
    );
    console.log(contractInstance, networkId);
    setContract(contractInstance);

    return accounts[0];
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        balance,
        setBalance,
        walletAddress,
        connectWallet,
        contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default ContractContextProvider;
