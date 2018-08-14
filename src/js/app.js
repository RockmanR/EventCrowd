// The below code is inspired by the TokenTutorial in TruffleBoxes. It surves my purpose for the Event Crowd contract
// As I don't have background on webdesign, I'm trying to minimize the scope of it.

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider to a local channel
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {

    // Retrieve the json file of the contract to interact with other Crowdsale contract.
    $.getJSON('MyCrowdsale.json', function(data) {

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MyCrowdsaleArtifact = data;
      App.contracts.MyCrowdsale = TruffleContract(MyCrowdsaleArtifact);

      // Set the provider for our contract.
      App.contracts.MyCrowdsale.setProvider(App.web3Provider);
    })

    // Retrieve the contract's json file to interact with the Token contract.
    $.getJSON('MyToken_01.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TokenArtifact = data;
      App.contracts.MyToken = TruffleContract(TokenArtifact);

      // Set the provider for our contract.
      App.contracts.MyToken.setProvider(App.web3Provider);

      // call refreshPage to update the status of the contracts
      return App.refreshPage();
    })
    ;

  },

  // Set the functionality for the web buttons
  bindEvents: function() {
    $(document).on('click', '#reserveButton', App.buyTickets);
    $(document).on('click', '#idtransferOwnership', App.transferOwnership);
    $(document).on('click', '#idFinalize', App.finalize);
    $(document).on('click', '#idClaimRefund', App.claimRefund);
    $(document).on('click', '#idRefresh', App.refreshPage);
    $(document).on('click', '#idSetTime', App.setTime);
  },

  // Update the status of the contract by executing all the related functions
  refreshPage: function() {
    App.bindEvents();
    App.getOpeningTime();
    App.getClosingTime();
    App.getStartStatus();
    App.getCloseStatus();
    App.getEthBalance();
    App.getFundingGoal();
    App.getTokenAddress();
    App.getTokenOwner();
    App.getCrowdsaleAddress();
    App.getCrowdsaleOwner();
    App.getGoalReached();
    App.getTicketBalance();
    App.getIsFinalized();
    App.getContractBalance();
    App.getTotalSupply();
  },

  // please refer to the comment on MyCrowdsale_01.sol
  getOpeningTime: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.timeToStartContract();
                }).then(function(result) {
                  console.log('the opening time is: '+result);
                  $('#idContractStart').text(result +' seconds');
                }).catch(function(err) {
                  console.log(err.message);
                });
  },


  // please refer to the comment on MyCrowdsale_01.sol
  getClosingTime: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.timeToCloseContract();
                }).then(function(result) {
                  console.log('the closing time is: '+result);
                  $('#idContractClose').text(result +' seconds');
                }).catch(function(err) {
                  console.log(err.message);
                });
  },



  // please refer to the comment on MyCrowdsale_01.sol
    getGoalReached: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.goalReached();
                  }).then(function(result) {
                    $('#idGoalReached').text(result);
                    console.log('Goal reached is ' + result);
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },



    // please refer to the comment on MyCrowdsale_01.sol
    getIsFinalized: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.isFinalized.call();
                  }).then(function(result) {
                    console.log('finalized status is '+result);
                    $('#idIsFinalized').text(result);
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },

    // please refer to the comment on MyCrowdsale_01.sol
    getStartStatus: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.getStartStatus();
                  }).then(function(result) {
                    console.log('Contract start is '+result);
                    $('#idContractStarted').text(result);
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },

    // please refer to the comment on MyCrowdsale_01.sol
    getCloseStatus: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.getCloseStatus();
                  }).then(function(result) {
                    console.log('Contract closure is '+result);
                    $('#idContractClosed').text(result);
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },


    // please refer to the comment on MyCrowdsale_01.sol
    getContractBalance: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.getEscrowAddress();
                  }).then(function(resultAdr) {
                          web3.eth.getBalance(resultAdr, function(error, result){
                          if(!error) {
                            $('#idConractBalanceEth').text(result/1000000000000000000 +' ether');
                            console.log('Contract balance is ' + result/1000000000000000000 +' ether');
                          }else
                            console.error(error);
                          })
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },

    // please refer to the comment on MyCrowdsale_01.sol
    getFundingGoal: function() {
      var crowdsaleInstance;
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                    crowdsaleInstance = instance;
                    return crowdsaleInstance.goal.call();
                  }).then(function(result) {
                    console.log('Contract funding Goal is '+result/1000000000000000000+' ether');
                    $('#idFundingGoal').text(result/1000000000000000000 +' ether');
                  }).catch(function(err) {
                    console.log(err.message);
                  });
    },


  /**
  * @dev this function is used to send ether to Crowdsale in order to buy tickets (mine tokens)
  */
  buyTickets: function() {
    event.preventDefault();
    var crowdsaleInstance;
    var amount = parseInt($('#buyingAmount').val());

                web3.eth.getAccounts(function(error, accounts) {
                  if (error) {
                    console.log(error);
                  }
                      App.contracts.MyCrowdsale.deployed().then(function(instance) {
                      crowdsaleInstance = instance;
                        return crowdsaleInstance.sendTransaction( {from: accounts[0], value: web3.toWei(amount/100, 'ether')}); //
                      }).then(function(result) {
                         alert('Transfer Successful!');
                      }).catch(function(err) {
                         console.log(err.message);
                      });
                });
  },


  /**
  * @dev the token contract is owned by the deployer at the beginning.
  * However, the ownership must be transferred to Crowdsale contract to be trustless and autonomus.
  * This is the function to do so.
  */
  transferOwnership: function() {
    event.preventDefault();
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                crowdsaleInstance = instance;
                            App.contracts.MyToken.deployed().then(function(instance) {
                              tokenInstance = instance;
                              return tokenInstance.transferOwnership(crowdsaleInstance.address);
                            }).then(function(result) {
                               alert('Ownership have transferred');
                            }).catch(function(err) {
                               console.log(err.message);
                            });
                }).then(function(result) {
                   // (opetional)
                }).catch(function(err) {
                   console.log(err.message);
                });
  },

  /**
  * @dev finalize function is located in FinalizableCrowdsale.
  *
  * It can only be executed when the contract have ended (passed deadline)
  *
  * Once clicked it takes the money from the escrow account to the _wallet address
  * (which is the fund raiser) if the funding goal have reached.
  *
  * However, if the goal didn't reach this button will change the the escrow account State
  * from "Active" to "withdraw", allowing the users to get their money back through claimRefund function.
  */
  finalize: function() {
    event.preventDefault();
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                crowdsaleInstance = instance;
                return crowdsaleInstance.finalize();
                }).then(function(result) {
                   console.log('finalization clicked');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },

  /**
  * @dev claimRefund function is located in RefundableCrowdsale.
  *
  * It can only be executed when 1) contract deadline reached 2) funding goal didn't reach
  * 3) Owner executed finalize
  *
  * The function takes the ether from escrow contract and returns it back to the user.
  * It also takes the tokens from the user (technically burns them) with
  * burnByCrowdsale function located in BurnableCrowdsale contract.
  */
  claimRefund: function() {
    event.preventDefault();
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                crowdsaleInstance = instance;
                return crowdsaleInstance.claimRefund({gas:1000000});
                }).then(function(result) {
                   console.log('claim refund clicked');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },

  /**
  * @dev Get the address of the Token contract
  */
  getTokenAddress: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  $('#idTokenAddress').text(tokenInstance.address);
                  console.log('The Token contract addresss is ' + tokenInstance.address);
                });
  },

  /**
  * @dev Get the address of the Crowdsale contract
  */
  getCrowdsaleAddress: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  $('#idCrowdsaleAddress').text(crowdsaleInstance.address);
                  console.log('The Crowdsale contract addresss is ' + crowdsaleInstance.address);
                });
  },

  /**
  * @dev Get the address of the Token contract owner.
  * In our case the first owner is the deployer account.
  * then we need to transfer the onwership from our personal account to Crowdsale contract.
  */
  getTokenOwner: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  return tokenInstance.owner.call();
                }).then(function(result) {
                  $('#idTokenOwner').text(result);
                  console.log('The Token Ownder addresss is ' + result);
                }).catch(function(err) {
                  console.log(err.message);
                });
  },

  /**
  * @dev Get the address of the Crowdsale contract owner. It should be the deployer account used by Truffle.
  * In my example it is:
  * - Ganache account when connected to Ganache
  * - Metamask account wehn connected to Infura
  * - Mist account when connected to Geth
  */
  getCrowdsaleOwner: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.owner_.call();
                }).then(function(result) {
                  $('#idCrowdsaleOwner').text(result);
                  console.log('The Crowdsale Ownder addresss is ' + result);
                }).catch(function(err) {
                  console.log(err.message);
                });
  },

  /**
  * @dev Get the current total supply of tokens (in our example tickets).
  * It increases when people by tickets and decreases when they withrow their funding
  */
  getTotalSupply: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  return tokenInstance.totalSupply();
                }).then(function(result) {
                  $('#idConractBalanceTic').text((result/1000000000000000000)+ ' tickets');
                  console.log('The total Ticket supply is ' + (result/1000000000000000000));
                }).catch(function(err) {
                  console.log(err.message);
                });
  },

  /**
  * @dev Get the balance of tokens owned by the user, by refering to Metamask account.
  * The balance changes as you change the accounts from Metamask and refresh the page.
  */
  getTicketBalance: function() {
    var tokenInstance;
                web3.eth.getAccounts(function(error, accounts) {
                  if (error) {
                    console.log(error);
                  }
                              var account = accounts[0];
                              App.contracts.MyToken.deployed().then(function(instance) {
                                tokenInstance = instance;
                                return tokenInstance.balanceOf.call(account);
                              }).then(function(result) {
                                console.log('the ticket balance is '+(result/1000000000000000000));
                                $('#idTicketBalance').text((result.toNumber()/1000000000000000000)+ ' tickets');
                              }).catch(function(err) {
                                console.log(err.message);
                              });
                  });
  },

  /**
  * @dev Get the balance of ether from the escrow contract, which is the total funding amount.
  * Again, it increases when people by tickets and decreases when they withrow their funding
  */
  getEthBalance: function() {
    var crowdsaleInstance;
    var account;

                web3.eth.getAccounts(function(error, accounts) {
                  if (error) {
                    console.log(error);
                  }
                              account = accounts[0];
                              web3.eth.getBalance(account, function(error, result){
                                  if(!error) {
                                    $('#idEthBalance').text((result/1000000000000000000) +' ether');
                                      console.log('Your ether balance is ' + result/1000000000000000000);
                                  }else
                                      console.error(error);
                              })
                });
  },

  // please refer to the comment on MyCrowdsale_01.sol
  setTime: function() {
    var crowdsaleInstance;
    var startTime = parseInt($('#idSetStartTxt').val());
    var closingTime = parseInt($('#idSetCloseTxt').val());
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.setTime(startTime,closingTime);
                }).then(function() {                                      //there might be a way to do it without 'then'
                  console.log('The start of the contract is ' +startTime+ ' seconds from now');
                  console.log('The close of the contract is ' +closingTime+ ' seconds from now');
                }).catch(function(err) {
                  console.log(err.message);
                });
  },

  // this does nothing. its just a template for future functions. ignore it.
  lastFunc: function() {}

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
