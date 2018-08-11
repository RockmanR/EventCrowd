App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    // Retrieve the contract's json file to interact with the Crowdsale contract.
    $.getJSON('MyCrowdsale.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MyCrowdsaleArtifact = data;
      App.contracts.MyCrowdsale = TruffleContract(MyCrowdsaleArtifact);

      // Set the provider for our contract.
      App.contracts.MyCrowdsale.setProvider(App.web3Provider);
    })
    // Retrieve the contract's json file to interact with the Token contract.
    $.getJSON('OZT_00.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TokenArtifact = data;
      App.contracts.MyToken = TruffleContract(TokenArtifact);

      // Set the provider for our contract.
      App.contracts.MyToken.setProvider(App.web3Provider);

      return App.refreshPage();
    })
    ;

  },

  bindEvents: function() {
    $(document).on('click', '#reserveButton', App.buyTickets);
    $(document).on('click', '#idtransferOwnership', App.transferOwnership);
    $(document).on('click', '#idFinalize', App.finalize);
    $(document).on('click', '#idClaimRefund', App.claimRefund);
    $(document).on('click', '#idRefresh', App.refreshPage);
    $(document).on('click', '#idSetTime', App.setTime);
    //$(document).on('click', '#idFinalizedTrue', App.forceFinalizedTrue);
    //$(document).on('click', '#idFinalizedFalse', App.forceFinalizedFalse);
  },

  refreshPage: function() {
    App.bindEvents();
    //App.getState();
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
    //App.getContractState(); //what is the difference between state (above) and contractState
    App.getTicketBalance();
    App.getIsFinalized();
    App.getContractBalance();
    App.getTotalSupply();
  },


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


  getClosingTime: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  return crowdsaleInstance.timeToCloseContract();
                }).then(function(result) {
                  $('#idContractClose').text(result +' seconds');
                }).catch(function(err) {
                  console.log(err.message);
                });
  },



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



    getIsFinalized: function() {
      var crowdsaleInstance;
      var status;                                                                 //not required
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



  buyTickets: function() {
    event.preventDefault();
    var crowdsaleInstance;
    var amount = parseInt($('#buyingAmount').val());

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                  //var account = accounts[0];
                  App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                    return crowdsaleInstance.sendTransaction( {from: accounts[0], value: web3.toWei(amount/100, 'ether')});
                  }).then(function(result) {
                     alert('Transfer Successful!');
                     return App.refreshPage();
                  }).catch(function(err) {
                     console.log(err.message);
                  });
    });
  },

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
                   //alert('Ownership have transferred');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },


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


  getTokenAddress: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  $('#idTokenAddress').text(tokenInstance.address);
                  console.log('The Token contract addresss is ' + tokenInstance.address);
                });
  },


  getCrowdsaleAddress: function() {
    var crowdsaleInstance;
                App.contracts.MyCrowdsale.deployed().then(function(instance) {
                  crowdsaleInstance = instance;
                  $('#idCrowdsaleAddress').text(crowdsaleInstance.address);
                  console.log('The Crowdsale contract addresss is ' + crowdsaleInstance.address);
                });
  },


  getTokenOwner: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  return tokenInstance.owner.call();
                }).then(function(result) {                                      //there might be a way to do it without 'then'
                  $('#idTokenOwner').text(result);
                  console.log('The Token Ownder addresss is ' + result);
                }).catch(function(err) {
                  console.log(err.message);
                });
  },


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

  getTotalSupply: function() {
    var tokenInstance;
                App.contracts.MyToken.deployed().then(function(instance) {
                  tokenInstance = instance;
                  return tokenInstance.totalSupply();
                }).then(function(result) {                                      //there might be a way to do it without 'then'
                  $('#idConractBalanceTic').text(((result/1000000000000000000)*100)+ ' tickets');
                  console.log('The total Ticket supply is ' + (result/1000000000000000000)*100);
                }).catch(function(err) {
                  console.log(err.message);
                });
  },


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
                      console.log('the ticket balance is '+(result/1000000000000000000)*100);
                      $('#idTicketBalance').text((result.toNumber()/1000000000000000000)*100);
                    }).catch(function(err) {
                      console.log(err.message);
                    });
      });
  },


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
                    $('#idEthBalance').text(result/1000000000000000000);
                      console.log('Your ether balance is ' + result/1000000000000000000);
                  }else
                      console.error(error);
              })
      });
  },


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


  lastFunc: function() {}                           //    can we just keep that at the end

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
