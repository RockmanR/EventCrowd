pragma solidity ^0.4.23;

import './MyCrowdsale_01.sol';

/**
* @dev This Crowdsale contract have no practical use. It is just a clean contract
* (no state varialbles or functions) that inherents MyCrowdsale_01 (or any other)
* and is the one that gets called by Truffle migrations. why we need it? we really
* don't, it just looks neat to call a clean parent contract.
*/
contract MyCrowdsale is MyCrowdsale_01 {

  /**
  * @dev We are getting just one external variable (MyToken) for the constructor.
  * all the rest of variables are hard coded in "MyCrowdsale_01" contract.
  * the main reason for this, is that i've faced issues wiht Java Script's Asyncronous code when i'm requesting
  * the block number to set the time for "start contract" and "contract deadline".
  * So as a workaround, I've included them in solidity with "now" and "seconds".
  */
    constructor (MyToken_01 _token) public MyCrowdsale_01(_token){
    }
}
