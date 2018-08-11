pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';
import './BurnableCrowdsale.sol';
import './OZT_00.sol';

   /**
   * @dev This Crowdsale contract contins a collection of OpenZeppelin contracts which are:
   * - Crowdsale:             this is the basic (bare minimum) for a crowdsale functionality. the add-ons are below..
   * - Minted Crowdsale:      this add-on feature let the contract mint Tokens only when an ether payment is made by an a user.
   * - Timed Crowdsale:       this add-on feature provide the ability to have a start and end date for a crowdsale.
   * - Finalizable Crowdsale: this add-on let the contract to collect the funds and only send it to the Owner when the deadline is achieved and "Finalize" function is triggered by the Onwer.
   * - Refundable Crowdsale:  this add-on provides refunding option when the funding goal is not reached post the deadline.
   * - Burnable Crowdsale:    this add-on burns a user tokens when he/she requests for refunding.
   *
   * @dev "_wallet" should be the authorized Geth account, or the HD wallet from truffle for Infura deployment.
   */

contract OZC_00 is BurnableCrowdsale, MintedCrowdsale {
    address public owner_;
    address _wallet = msg.sender;
    uint256 _openingTime = now + 3 minutes + 1 seconds;
    uint256 _closingTime = _openingTime + 5 minutes + 1 seconds;
    uint256 _rate = 1;
    uint goal = 1 ether;
    OZT_00 token;

    constructor
        (
            OZT_00 _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(goal)
        BurnableCrowdsale(_token)
        {
         owner_ = msg.sender;
        }


        //this function to get the time to start the funding. it will be accessed by web3 instance
            function timeToStartContract() public view returns (uint){
              uint opTime;
              if (openingTime > now){
                opTime = openingTime - now;
              } else {
                opTime = 0;
              }
              return opTime;
            }
        //this function to get the time to close the funding. it will be accessed by web3 instance
            function timeToCloseContract() public view returns (uint){
              uint clsTime;
              if (closingTime > now){
                clsTime = closingTime - now;
              } else {
                clsTime = 0;
              }
              return clsTime;
            }
            function getEscrowAddress() public view returns (address){

              return escrow;
            }
            function getStartStatus() public view returns (bool){
              bool x;
              if (timeToStartContract() == 0){
                x = true;
              } else {
                x = false;
              }
              return x;
            }
            function getCloseStatus() public view returns (bool){
              bool x;
              if (timeToCloseContract() == 0){
                x = true;
              } else {
                x = false;
              }
              return x;
            }

////////////////////////////////////////////////////////////////////////////////

        //these functions are for testing purposes only
              function setTime(uint startTime_, uint closingTime_) public {
                openingTime = now + startTime_;
                closingTime = now + closingTime_;
              }

}
