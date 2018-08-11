pragma solidity ^0.4.23;

import './OZC_00.sol';

contract MyCrowdsale is OZC_00 {

    constructor (OZT_00 _token) public OZC_00(_token){
    }
}
