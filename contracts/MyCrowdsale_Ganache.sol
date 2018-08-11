pragma solidity ^0.4.23;

import './OZC_00_Ganache.sol';

contract MyCrowdsale_Ganache is OZC_00_Ganache {

    constructor (OZT_00 _token, uint openingTime, uint closingTime) public OZC_00_Ganache(_token, openingTime, closingTime) {
    }
}
