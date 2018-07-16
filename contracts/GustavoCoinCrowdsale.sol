pragma solidity 0.4.24;

import './GustavoCoin.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';


contract GustavoCoinCrowdsale is TimedCrowdsale, MintedCrowdsale {
    address public owner_;
    uint phase1deadline;
    uint phase2deadline;
    function GustavoCoinCrowdsale
        (
            uint256 _openingTime,
            uint256 _closingTime,
            uint256 _rate,
            address _wallet,
            MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime) {
          owner_ = msg.sender;
          phase1deadline = _closingTime + 1 minutes;
          phase2deadline = phase1deadline + 1 minutes;
        }

//this is where my code starts
//this function to get the time to start the funding. it will be accessed by web3 instance
    function timeToStartContract() public view returns (uint){
      return openingTime - now;
    }
//this function to get the time to close the funding. it will be accessed by web3 instance
    function timeToCloseContract() public view returns (uint){
      return closingTime - now;
    }
//this function to get the time to close the phase 1 period. it will be accessed by web3 instance
    function timeToPhase1Deadline() public view returns (uint){
      return phase1deadline - now;
    }
//this function to get the time to close the phase 2 period. it will be accessed by web3 instance
    function timeToPhase2Deadline() public view returns (uint){
      return phase2deadline - now;
    }
}
