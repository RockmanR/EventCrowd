pragma solidity ^0.4.23;

import './OZT_00.sol';
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';

contract BurnableCrowdsale is RefundableCrowdsale {

    OZT_00 token;

    constructor
        (
            OZT_00 _token
        )
        public
        {
         token = _token;
        }

    function claimRefund() public {
        super.claimRefund();
        token.burnByCrowdsale(token.balanceOf(msg.sender), msg.sender);
    }
}
