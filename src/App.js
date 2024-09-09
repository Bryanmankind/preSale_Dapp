import './App.css';
import { Body } from './Body';
import { Navbar } from './Navbar';
import React from 'react';
import {useEffect, useState} from "react";
import  preSaleContract from "./Ethereum/preSaleABI";
import preSaleToken from "./Ethereum/preSaleTokenABI";
import USDCContract from "./Ethereum/USDCAbi";
import { ethers } from "ethers";



function App() {
  const [walletaddress, setWalletAddress] = useState('');
  const [signer, setSigner] = useState("");
  const [presaleContract, setPreSaleContract] = useState("");
  const [presaleTokenContract, setPreSaleTokenContract] = useState("");
  const [usdcContract, setUSDCContract] = useState("");
  const [withDrawSuccess, setWithDrawSuccess] = useState("");

 

  useEffect (() => {
    currentAcct();
    accListener ();
  })

  const walletConnect = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
      setWalletAddress(accounts[0])
      console.log(accounts[0])
      setWithDrawSuccess("Thank you for buying pmt token");

      }catch (e){
        console.log(e)
      }
    }else{
      console.log("Install metamask extention")
    }
  }
  
  
  const currentAcct = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({method: "eth_accounts"})

      if (accounts.length > 0) {
        setSigner(await provider.getSigner());
        setPreSaleContract(preSaleContract(provider));
        setPreSaleTokenContract(preSaleToken(provider));
        setUSDCContract(USDCContract(provider));
        setWalletAddress(accounts[0])
        console.log(accounts[0])

      }else{
        console.log("connect with connect button")
      }

      }catch (e){
        console.log(e)
      }
    }else{
      console.log("Install metamask extention")
    }
  }
  
  const accListener = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0])
        console.log(accounts[0])
      })
    }else{
      console.log("Install metamask extention")
    }
  }


  return (
    <div className='App'>
      <Navbar walletConnect={walletConnect} walletaddress={walletaddress}/>
      <Body walletaddress={walletaddress} signer={signer} presaleContract={presaleContract} withDrawSuccess={withDrawSuccess} presaleTokenContract=
      {presaleTokenContract} usdcContract={usdcContract} walletConnect={walletConnect}/>
    </div>
  );
}
export default App;
