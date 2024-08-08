import { createContext, useContext } from "react";
import Web3 from "web3";

export interface TokenContextType {
  web3: Web3 | null;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  walletAddress: string;
  connectWallet: () => Promise<any>;
  contract: any;
  modalIsOpen: number;
  setModalIsOpen: React.Dispatch<React.SetStateAction<number>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  recipient: string;
  setRecipient: React.Dispatch<React.SetStateAction<string>>;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  setContract: React.Dispatch<React.SetStateAction<any>>;
  connectContract: any;
}

export const Web3Context = createContext<TokenContextType | undefined>(
  undefined
);

export const useWeb3 = (): TokenContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
