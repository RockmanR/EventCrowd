pragma solidity ^0.4.23;

import './GustavoCoin.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';

contract RefundableGCC is RefundableCrowdsale, MintedCrowdsale {
    address public owner_;
    uint256 _openingTime = now + 2 minutes;
    uint256 _closingTime = _openingTime + 3 minutes;
    uint256 _rate = 1000;
    address _wallet = 0x88d25dE3ceACa489aeb673cFf4AA744e838a8aAC;
    uint256 _goal = 1 ether;
    uint phase1deadline;
    uint phase2deadline;

    constructor
        (
          MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(_goal)
        {
         owner_ = msg.sender;
         //phase1deadline = _closingTime + 1 minutes;     //currently not used (I'll activate it when i have enough time)
         //phase2deadline = phase1deadline + 1 minutes;   //currently not used (I'll activate it when i have enough time)
        }

//this is where my code starts
//this function to get the time to start the funding. it will be accessed by web3 instance
    function timeToStartContract() public view returns (uint){
      return openingTime - now;
    }
//this function to get the time to close the funding. it will be accessed by web3 instance
    function timeToCloseContract() public view returns (uint){
      return _closingTime - now;
    }
//this function to get the time to close the phase 1 period. it will be accessed by web3 instance
    function timeToPhase1Deadline() public view returns (uint){
      return phase1deadline - now;
    }
//this function to get the time to close the phase 2 period. it will be accessed by web3 instance
    function timeToPhase2Deadline() public view returns (uint){
      return phase2deadline - now;
    }
    function getEscrowAddress() public view returns (address){
      return escrow;
    }

}
