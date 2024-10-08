// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PMTToken is ERC20 {

    address payable public owner; 

    constructor() ERC20("PERMIT", "PMT") {

        owner = payable(msg.sender);

        // Mint initial supply to contract creator
        _mint(msg.sender, 1_000_000_000 * 10**18);
    }
}
