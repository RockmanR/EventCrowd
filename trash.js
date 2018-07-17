


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
