import logo from "./starter-logo.png";


export function Navbar({walletConnect, walletaddress}) {
  
  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="logo" />
        <ul>
          <li><a href="https://starter.xyz/#/pools">Projects</a></li>
          <li><a href="https://starter.xyz/#/staking">Stake</a></li>
          <li><a href="https://starter.xyz/#/voting?page=1">Research</a></li>
          <li><a href="https://locker.starter.xyz/#/home?page=1">Locker</a></li>
          <li><a href="https://docs.starter.xyz/overview/about-the-team">About</a></li>
        </ul>
        
        <button href="https://form.typeform.com/to/NPvV8s53?typeform-source=starter.xyz">Get Certified</button>
        <button id="pool">Create Pool</button>
        <button onClick={walletConnect}>{walletaddress && walletaddress.length > 0 ? `${walletaddress.substring(0,4)}....${walletaddress.substring(38) }` : "Connect Wallet"}</button>
      </nav>
    </div>
  );
}
