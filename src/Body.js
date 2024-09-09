import logo2 from "./logo2.png"; 
import {useState, useRef, useEffect} from "react";
import { ethers } from "ethers";


export function Body ({signer, walletaddress, presaleContract, presaleTokenContract, usdcContract, walletConnect}) {

  const [showBuyToken, setShowBuyToken] = useState(false);
  const [ethAmount, setEthAmount] = useState(''); 
  const [usdcAmount, setUSDCAmount] = useState(''); 
  const [inputError, setInputError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const buyTokenRef = useRef(null);


  const handleButtonClick = () => {
    walletaddress && walletaddress.length > 0 ? setShowBuyToken(true) : walletConnect();
  };

  const handleClickOutside = (event) => {
    if (buyTokenRef.current && !buyTokenRef.current.contains(event.target)) {
      setShowBuyToken(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEthInputChange = (event) => {
    const ethValue = event.target.value;
    const ethValueParsed = parseFloat(ethValue);


    if (ethValue === '' || isNaN(ethValueParsed) || ethValueParsed < 0.00061) {
      setInputError("Amount too low. Minimum is 0.00061 ETH.");
    } else {
      setInputError(null);
    }
    
    setEthAmount(ethValueParsed);
};

  const handleUSDCInputChange = (event) => {
    const usdcValue = event.target.value;
    setUSDCAmount(usdcValue);
    if (usdcValue === '' || usdcValue > 2 || isNaN(usdcValue)) {
      setInputError(null);
    } else {
      setInputError("Amount too low. Minimum is 2 USDC.");
    }
  };

  const BuyTokenWithUSDC = async (event) => {
    event.preventDefault();
    if (usdcAmount < 2) {
      setInputError("Amount too low. Minimum is 2 USDC.");
      return;
    }
    try {
      setIsLoading(true);
      setSuccessMessage('');
      const preSaleContractWithSigner = presaleContract.connect(signer);
      const USDCContractWithSigner = usdcContract.connect(signer);
      const usdcAmountInWei = ethers.parseUnits(usdcAmount.toString(), 6);


      const approveTx = await USDCContractWithSigner.approve("0x7f69C982D3CaC0ab0820e83340C0b9E4De6f5d8B", usdcAmountInWei);
            await approveTx.wait();
            const gasLimit = ethers.toBeHex(300000);

            const resp = await preSaleContractWithSigner.butTokenWithUSDC(usdcAmountInWei, {
              gasLimit: gasLimit
            });

            await resp.wait();
            console.log(resp);
            setSuccessMessage('PMT Token sent');
    } catch (err) {
      console.error(err.message);
    }finally {
      setIsLoading(false);
      setSuccessMessage(false);
    }
  }

  const BuyTokenWithEth = async (event) => {
    event.preventDefault();
    if (!ethAmount || ethAmount < 0.00061) {
      setInputError("Amount too low. Minimum is 0.00061 ETH.");
      return;
  }
    try {
      setIsLoading(true);
      setSuccessMessage('');
      const preSaleContractWithSigner = presaleContract.connect(signer);
      const weiAmount = ethers.parseUnits(ethAmount.toString(), "ether");
      const gasLimit = ethers.toBeHex(200000);

      const resp = await preSaleContractWithSigner.buyTokenWithEth({
        value: weiAmount,
        gasLimit: gasLimit
      });

      setSuccessMessage('PMT Token sent');
      await resp.wait();
      console.log(resp);
    } catch (err) {
      console.error(err.message);
    }finally {
      setIsLoading(false);
      setSuccessMessage(false);
    }
  };

  return (
    <div className="body">
      {isLoading && (
      <div className="overlay">
          <div className="overlay-content">
            <h2>Processing Transaction...</h2>
            <p>Please wait while your transaction is being processed.</p>
          </div>
        </div>
     )}
     {successMessage && (
      <div  className="overlay">
        <div className="overlay-content">
          <h2>{successMessage}</h2>
        </div>
      </div>
    )}
      <div className="section-1">
        <div className="section-1-top">
          <img src={logo2} alt="logo" />
          <h1>PMT Token Private Sale </h1>
        </div>
        <div className="text">
          <p>
            Starter specializes in the research and development for blockchain-based products at the intersection of innovation and funding. We launched in February 2021 as a decentralized launchpad initially for Binance Smart Chain, followed by Polygon, Fantom, Avalanche, and Ethereum, eventually growing to become a #1 launchpad in the space by Q4'2021 based on ROI, according to CryptoRank.io stats. </p>

          <p>Crypto winter led us to embark on a new journey to build IRL! Our latest initiative during the bear market was establishing a physical crypto-only builder space in the heart of Atlanta, Georgia, USA. Atlanta is home to the #1 most busiest airport in the world (ATL-Hartsfield); the #4 top engineering school in the USA (Georgia Tech); 70% of the world's financial payment transactions; the civil rights movement; and leading artists and blockbuster movies created over the last decade. To date, we have held over 100+ weekly crypto events and incubated 20 companies IRL.</p>


          <p>Join us in the onchain capital revolution on Base, where entrepreneurs connect with visionary backers to create a new future.
          </p>
        </div>
        <div className="investment">
              <h3>Your Investment</h3>
            <div className="sellToken" style={{ display: showBuyToken ? 'none' : 'block' }}>
              <button onClick={handleButtonClick}>
                <h4>{walletaddress && walletaddress.length > 0 ? "Buy PMT Token" : "Connect Wallet"}</h4>
              </button>
            </div>
           <div className="buyToken" ref={buyTokenRef} style={{ display: showBuyToken ? 'block' : 'none' }}>
              <form action="">
                <div className="input-group">
                  <input type="number" step="0.0000001" placeholder="Amount in ETH" value={ethAmount} onChange={handleEthInputChange} required />
                  <p>Min Eth 0.00061 ether</p>
                  <button onClick={BuyTokenWithEth} type="submit"><h4>Buy PMT Token With Eth</h4></button>
                </div>
                <div className="input-group">
                  <input type="number" placeholder="Amount in USDC" value={usdcAmount} onChange={handleUSDCInputChange} required />
                  <p>Min USDC 10USDC</p>
                  <button onClick={BuyTokenWithUSDC} type="submit"><h4>Buy PMT Token With USDC</h4></button>
                </div>
              </form>
            </div>
        </div>
      </div>
      <div className="section-2">
        <div className="first-bar">
          <div className="first-bar-flex">
          <h5>Fundraise Goal</h5>
          <p>filled</p>
          </div>
          <div className="first-bar-fig">
            <h5>14000 / 14000 USDC</h5>
            <div className="bar"></div>
          </div>
          <div className="participant">
          <h5> 1 Participants</h5>
          </div>
        </div>
        <div className="second-bar">
          <h1>Disclaimer</h1>

          <h5>PLEASE NOTE THAT WE CANNOT ACCEPT USERS FROM THE FOLLOWING COUNTRIES:</h5>
          <h5 id="add-dot">
          Afghanistan, Albania, Bahamas, Barbados, Botswana, Cambodia, Canada, Cuba, Ghana, Iran (Islamic Republic of), Iraq, Jamaica, Korea (the Democratic People’s Republic of), Libya, Mauritius, Myanmar, Nicaragua, Panama, Pakistan, South Sudan, Sudan (North), Syrian Arab Republic, The Crimea, Trinidad and Tobago, Uganda, United States of America, Vanuatu, Yemen, Zimbabwe; <br />
          Jurisdictions in which participation or ownership of tokens is prohibited by any applicable Law; <br />
          Jurisdictions which are subject to United States, United Nations, or other applicable sanctions or embargoes.
          </h5>

          <h5>
          By interacting with this platform you hereby declare through onchain signature, your proficiency in financial matters and intent to partake in digital asset transactions, despite their volatility and high risks. You also waive any right to hold this platform, its development team, or any affiliated organizations responsible for the results of your engagement in any token sale activities.
          </h5>
        </div>
      </div>
    </div>
  );
}
