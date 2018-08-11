
/*



force Finalized   //////


<strong>Force the contract to be Finalized: </strong>
<button class="" id="idFinalizedTrue" type="button">Set</button>
<br/>
<br/>
<strong>Force the contract NOT to be Finalized: </strong>
<button class="" id="idFinalizedFalse" type="button">Set</button>
<br/>
<br/>


/*
  forceFinalizedTrue: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.forceFinalizedTrue();
                }).then(function() {                                      //there might be a way to do it without 'then'
                  console.log('Force finalize processed');
                }).catch(function(err) {
                  console.log(err.message);
                });
  },

  /*
  function forceFinalizedTrue() public {
    isFinalized = true;
  }
  function forceFinalizedFalse() public {
    isFinalized = false;
  }
  function forceActive() public {
    escrow.state = State.Active;
  } **/

  


  forceFinalizedFalse: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.forceFinalizedFalse();
                }).then(function() {                                      //there might be a way to do it without 'then'
                  console.log('Force NOT finalize processed');
                }).catch(function(err) {
                  console.log(err.message);
                });
  }, **/





Voting ///////


<strong>Voting</strong>:
<button class="" id="voteToStop" type="button">Dissatisfied</button>
<button class="" id="voteToStop" type="button">Satisfied</button>
<br/><br/>

/////////



  getEscrowOwner: function() {
    console.log('Attempting to get escrow owner...');
    var crowdsaleInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        crowdsaleInstance = instance;
                        return crowdsaleInstance.getEscrowAddress();
                }).then(function(result) {
                        $('#idEscrowOwner').text(result);
                        console.log('Escrow owner is ' + result);
                }).catch(function(error) {
                        console.log(err.message);
                });
    return App.getPhase1deadline();
  },
**/
/*
  getPhase1deadline: function() {
    var crowdsaleInstance;
    console.log('Attempting to get phase 1 deadline...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.timeToPhase1Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase1deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getPhase2deadline();
  },


  getPhase2deadline: function() {
    var crowdsaleInstance;
    console.log('Attempting to get phase 2 deadline...');
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.timeToPhase2Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase2deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getEscrowBalance();
  },

**/

/*


/*
  getEscrowAddress: function() {
    console.log('Attempting to get escrow address...');
    var crowdsaleInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.getEscrowAddress();
                }).then(function(result) {
                        console.log('the escrow address is'+result);
                        $('#idEscrowAddress').text(result);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getCrowdsaleAddress();
  },
*/

/*
<br/><FONT COLOR="2E64FE"> if the seconds are at '11579208' or too high that means its reached below zero</font>
<br/><FONT COLOR="A4A4A4">this is due to uint variable, it can be solved by an if statement. currently I'll keep it to show an example of how 'underflow' bugs happen</font>


// trying asyc functions

/*
var openingTime;
var closingTime;
const rate = 1;
const wallet = "0x88d25dE3ceACa489aeb673cFf4AA744e838a8aAC"; //accounts[0];
const goal = 500000000000000000; // 0.5 ether
**/
/*
const getOpeningTime = async function getOpeningTime(){
        openingTime = web3.eth.getBlock('latest').timestamp + 60*5;
        closingTime = openingTime + 60*5; // time in the future (sec * min)
}; **/

/*
const getOpeningTime = async function getOpeningTime(){
        openingTime = web3.eth.getBlock('latest').timestamp + 60*5;
        closingTime = openingTime + 60*5;
};
**/



/*
const funcGustavoCoin = async function funcGustavoCoin(){
  return deployer.deploy(GustavoCoin);
};

const funcRefundableGCC = async function funcRefundableGCC(){
  return deployer.deploy(RefundableGCC,openingTime,closingTime,rate,wallet,GustavoCoin.address,goal);
} **/
/*
module.exports = (deployer) => {
  // Alternatively, just start a chain without a deployment
  deployer.then(async () => {
    await getOpeningTime();
    await deployer.deploy(GustavoCoin);
    await deployer.deploy(RefundableGCC,openingTime,closingTime,rate,wallet,GustavoCoin.address,goal);
  })
}; **/




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
