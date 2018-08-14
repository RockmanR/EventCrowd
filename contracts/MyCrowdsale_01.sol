pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';
import './BurnableCrowdsale.sol';
import './MyToken_01.sol';

   /**
   * @dev This Crowdsale_01 contract contins a collection of OpenZeppelin contracts. And they are:
   * - Crowdsale:             this is the basic (bare minimum) for a crowdsale functionality. the add-ons are below..
   * - Minted Crowdsale:      this add-on feature let the contract mint Tokens only when an ether payment is made by an a user.
   * - Timed Crowdsale:       this add-on feature provide the ability to have a start and end date for a crowdsale.
   * - Finalizable Crowdsale: this add-on let the contract to collect the funds and only send it to the Owner when the deadline is achieved and "Finalize" function is triggered by the Onwer.
   * - Refundable Crowdsale:  this add-on provides refunding option when the funding goal is not reached post the deadline.
   * - Burnable Crowdsale:    this add-on burns a user tokens when he/she requests for refunding.
   *
   * @dev the "_wallet" address should be the authorized Geth account in case you are using Geth
   * or the HD wallet from truffle with mnemonic from Metamask (or other) for Infura deployment.
   */

contract MyCrowdsale_01 is BurnableCrowdsale, MintedCrowdsale {
    address public owner_;
    address _wallet = msg.sender;
    uint256 _openingTime = now + 3 minutes + 1 seconds;
    uint256 _closingTime = _openingTime + 5 minutes + 1 seconds;
    uint256 _rate = 100;
    uint goal = 1 ether;

    constructor
        (
            MyToken_01 _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(goal)
        BurnableCrowdsale(_token)
        {
         owner_ = msg.sender;
        }


            /**
            * @dev this function is to get the time to start the funding. it will be accessed by web3 instance
            */
            function timeToStartContract() public view returns (uint){
              uint opTime;
              if (openingTime > now){
                opTime = openingTime - now;
              } else {
                opTime = 0;
              }
              return opTime;
            }

            /**
            * @dev this function is to get the time to close the funding. it will be accessed by web3 instance
            */
            function timeToCloseContract() public view returns (uint){
              uint clsTime;
              if (closingTime > now){
                clsTime = closingTime - now;
              } else {
                clsTime = 0;
              }
              return clsTime;
            }

            /**
            * @dev this function is used to get Excrow address, then that
            * address will be used to get it's balance. it will be accessed by web3 instance
            */
            function getEscrowAddress() public view returns (address){
              return escrow;
            }

            /**
            * @dev this function is used to show 'true' when the crowdsale gets started.
            * it will be accessed by web3 instance
            */
            function getStartStatus() public view returns (bool){
              bool x;
              if (timeToStartContract() == 0){
                x = true;
              } else {
                x = false;
              }
              return x;
            }

            /**
            * @dev this function is used to show 'true' when the crowdsale gets closed (passed the deadline).
            * it will be accessed by web3 instance
            */
            function getCloseStatus() public view returns (bool){
              bool x;
              if (timeToCloseContract() == 0){
                x = true;
              } else {
                x = false;
              }
              return x;
            }



//////////////////////////////////   For Testing  ///////////////////////////////////

            /**
            * @dev this function is used for TESTING PURPOSES ONLY. it must not be available during real deployment.
            *
            * It gives you the ability to modify the time (start & deadline) in order to speed up the testing process
            *
            * It is also needed for truffle testing. since the timelines in truffle test is different.
            * (unless you know a way to keep truffle wait for a set number of seconds)
            */
            function setTime(uint startTime_, uint closingTime_) public {
              openingTime = now + startTime_;
              closingTime = now + closingTime_;
            }

}
