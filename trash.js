
// Testing

pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/RefundableGCC.sol";
import "../contracts/GustavoCoin.sol";

contract TestRefundableGCC {
  function testInitialBalanceUsingDeployedContract() {
    GustavoCoin GC = GustavoCoin(DeployedAddresses.GustavoCoin());

    uint expected = 0;

    Assert.equal(GC.totalSupply(), 0, "Owner should have 0 coin initially");
  }
/*
  function testInitialBalanceUsingDeployedContract2() {
    GustavoCoin GC = GustavoCoin(DeployedAddresses.GustavoCoin());
    RefundableGCC refundableGCC = RefundableGCC(DeployedAddresses.RefundableGCC());

    //GC.transferOwnership(DeployedAddresses.RefundableGCC());

    Assert.equal(GC.totalSupply(), 0, "Owner should have 0 coin initially");
  }**/

  //function testTokenOwnershipByCrowdsale() {
    //GustavoCoin GC = GustavoCoin(DeployedAddresses.GustavoCoin());
    //RefundableGCC refundableGCC = RefundableGCC(DeployedAddresses.RefundableGCC());

    //GC.transferOwnership(refundableGCC);

  //  Assert.equal(5, 5);
//  }

}





//////////

                App.contracts.RefundableGCC.deployed().then(function(instance) {
                    RefundableGCCInstance = instance;

                    //RefundableGCCInstance.escrow.call(function(address){
                        //escrowAddress = address;
                                                                                     // work here
                        App.contracts.RefundableGCC.deployed().then(function(instance) {
                          RefundableGCCInstance = instance; //currently not used...might be needed later. if not then delete

                          return RefundableGCCInstance.getEscrowAddress();
                          }).then(function(result) {
                                  web3.eth.getBalance(result, function(error, resultAdr){  //'0xE8ae61A5C281A5dD77fF4956EC8aC490Ea4aaDe9'
                                  if(!error) {
                                    console.log(JSON.stringify(resultAdr));
                                    $('#idConractBalanceEth').text(resultAdr);
                                    console.log('contract balance is ' + resultAdr);
                                    console.log('contract address is ' + result);
                                  }else
                                    console.error(error);
                                  })
                          }).catch(function(err) {
                                  console.log(err.message);
                          });
                    //});
                });

/// its html script


      <div id="idTT" class="row">
        <div class="col-sm-6 col-sm-push-3 col-md-4 col-md-push-4">
          <div class="panel panel-default">


            <div class="panel-heading">
              <h3 class="panel-title">TutorialToken</h3>
            </div>


            <div class="panel-body">

              <h4>Balance</h4>

              <strong>Balance</strong>: <span id="TTBalance"></span> TT
              <br/><br/>

              <h4>Transfer</h4>
              <input type="text" class="form-control" id="TTTransferAddress" placeholder="Address" />
              <input type="text" class="form-control" id="TTTransferAmount" placeholder="Amount" />
              <br/><br/>

              <button class="btn btn-primary" id="transferButton" type="button">Transfer</button>

            </div>

          </div>
          <br/><br/>
        </div>
      </div>



                <strong>Escrow contract    </strong>: <span id="idEscrowAddress"></span>
                <br/>
                <strong>Owned by           </strong>: <span id="idEscrowOwner"></span> (should be owned by "Crowdsale contract")
                <br/>
                <br/>


                <strong>Time to phase-1 deadline</strong>: <span id="phase1deadline"></span> seconds
                <br/>
                <strong>Time to phase-2 deadline</strong>: <span id="phase2deadline"></span> seconds
                <br/>
                <br/>
