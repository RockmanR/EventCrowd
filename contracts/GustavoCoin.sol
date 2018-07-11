pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract GustavoCoin is MintableToken {
    string public name = "GUSTAVO COIN";
    string public symbol = "GUS";
    uint8 public decimals = 18;
    address public owner_ = msg.sender;
}
