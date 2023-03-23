define("@scom/oswap-chainlink-contract/contracts/AggregatorProxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/oswap-chainlink-contract/contracts/AggregatorProxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
            { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "answer", "type": "int256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "answer", "type": "int256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b5060405161161f38038061161f8339818101604052602081101561003357600080fd5b5051600080546001600160a01b03191633179055610059816001600160e01b0361005f16565b506100ce565b60028054604080518082018252600161ffff80851691909101168082526001600160a01b0395909516602091820181905261ffff19909316851762010000600160b01b0319166201000084021790935560009384526004909252912080546001600160a01b0319169091179055565b611542806100dd6000396000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c80638da5cb5b116100d8578063b633620c1161008c578063f2fde38b11610066578063f2fde38b146103da578063f8a2abd31461040d578063feaf968c1461044057610177565b8063b633620c14610394578063c1597304146103b1578063e8c4be30146103d257610177565b80639a6fc8f5116100bd5780639a6fc8f51461031b578063a928c09614610344578063b5ab58dc1461037757610177565b80638da5cb5b1461030b5780638f6b4d911461031357610177565b80636001ac531161012f5780637284e416116101145780637284e4161461027c57806379ba5097146102f95780638205bf6a1461030357610177565b80636001ac531461020c578063668a0f021461027457610177565b806350d25bcd1161016057806350d25bcd146101cb57806354fd4d50146101e557806358303b10146101ed57610177565b8063245a7bfc1461017c578063313ce567146101ad575b600080fd5b610184610448565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101b561046a565b6040805160ff9092168252519081900360200190f35b6101d3610508565b60408051918252519081900360200190f35b6101d3610575565b6101f56105e2565b6040805161ffff9092168252519081900360200190f35b6102356004803603602081101561022257600080fd5b503569ffffffffffffffffffff166105ec565b6040805169ffffffffffffffffffff96871681526020810195909552848101939093526060840191909152909216608082015290519081900360a00190f35b6101d361074b565b610284610822565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102be5781810151838201526020016102a6565b50505050905090810190601f1680156102eb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61030161099f565b005b6101d3610aa1565b610184610b0e565b610235610b2a565b6102356004803603602081101561033157600080fd5b503569ffffffffffffffffffff16610c73565b6103016004803603602081101561035a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610da6565b6101d36004803603602081101561038d57600080fd5b5035610ee9565b6101d3600480360360208110156103aa57600080fd5b5035610fe3565b610184600480360360208110156103c757600080fd5b503561ffff166110a6565b6101846110ce565b610301600480360360208110156103f057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166110ea565b6103016004803603602081101561042357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166111e6565b6102356112b3565b60025462010000900473ffffffffffffffffffffffffffffffffffffffff1690565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d757600080fd5b505afa1580156104eb573d6000803e3d6000fd5b505050506040513d602081101561050157600080fd5b5051905090565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d757600080fd5b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d757600080fd5b60025461ffff1690565b600354600090819081908190819073ffffffffffffffffffffffffffffffffffffffff1661067b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b600354604080517f9a6fc8f500000000000000000000000000000000000000000000000000000000815269ffffffffffffffffffff89166004820152905173ffffffffffffffffffffffffffffffffffffffff90921691639a6fc8f59160248082019260a092909190829003018186803b1580156106f857600080fd5b505afa15801561070c573d6000803e3d6000fd5b505050506040513d60a081101561072257600080fd5b508051602082015160408301516060840151608090940151929a91995097509195509350915050565b60006107556114f5565b5060408051808201825260025461ffff81168083526201000090910473ffffffffffffffffffffffffffffffffffffffff16602080840182905284517f668a0f02000000000000000000000000000000000000000000000000000000008152945193946108109463668a0f0292600480840193919291829003018186803b1580156107df57600080fd5b505afa1580156107f3573d6000803e3d6000fd5b505050506040513d602081101561080957600080fd5b50516113d0565b69ffffffffffffffffffff1691505090565b6060600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b15801561088f57600080fd5b505afa1580156108a3573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405260208110156108ea57600080fd5b810190808051604051939291908464010000000082111561090a57600080fd5b90830190602082018581111561091f57600080fd5b825164010000000081118282018810171561093957600080fd5b82525081516020918201929091019080838360005b8381101561096657818101518382015260200161094e565b50505050905090810190601f1680156109935780820380516001836020036101000a031916815260200191505b50604052505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff163314610a2557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e657200000000000000000000604482015290519081900360640190fd5b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638205bf6a6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104d757600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff1681565b600354600090819081908190819073ffffffffffffffffffffffffffffffffffffffff16610bb957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b158015610c2157600080fd5b505afa158015610c35573d6000803e3d6000fd5b505050506040513d60a0811015610c4b57600080fd5b5080516020820151604083015160608401516080909401519299919850965091945092509050565b6000806000806000806000610c938869ffffffffffffffffffff166113f0565b61ffff821660009081526004602081905260408083205481517f9a6fc8f500000000000000000000000000000000000000000000000000000000815267ffffffffffffffff86169381019390935290519496509294509092839283928392839273ffffffffffffffffffffffffffffffffffffffff1691639a6fc8f59160248083019260a0929190829003018186803b158015610d2f57600080fd5b505afa158015610d43573d6000803e3d6000fd5b505050506040513d60a0811015610d5957600080fd5b50805160208201516040830151606084015160809094015192985090965094509092509050610d8c85858585858c6113f8565b9b509b509b509b509b505050505050505091939590929450565b60005473ffffffffffffffffffffffffffffffffffffffff163314610e2c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff828116911614610eb557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e76616c69642070726f706f7365642061676772656761746f720000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055610ee68161142e565b50565b600069ffffffffffffffffffff821115610f0557506000610fde565b600080610f11846113f0565b61ffff8216600090815260046020526040902054919350915073ffffffffffffffffffffffffffffffffffffffff1680610f515760009350505050610fde565b8073ffffffffffffffffffffffffffffffffffffffff1663b5ab58dc836040518263ffffffff1660e01b8152600401808267ffffffffffffffff16815260200191505060206040518083038186803b158015610fac57600080fd5b505afa158015610fc0573d6000803e3d6000fd5b505050506040513d6020811015610fd657600080fd5b505193505050505b919050565b600069ffffffffffffffffffff821115610fff57506000610fde565b60008061100b846113f0565b61ffff8216600090815260046020526040902054919350915073ffffffffffffffffffffffffffffffffffffffff168061104b5760009350505050610fde565b8073ffffffffffffffffffffffffffffffffffffffff1663b633620c836040518263ffffffff1660e01b8152600401808267ffffffffffffffff16815260200191505060206040518083038186803b158015610fac57600080fd5b60046020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461117057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b60005473ffffffffffffffffffffffffffffffffffffffff16331461126c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008060006112c36114f5565b5060408051808201825260025461ffff8116825262010000900473ffffffffffffffffffffffffffffffffffffffff166020820181905282517ffeaf968c0000000000000000000000000000000000000000000000000000000081529251919260009283928392839283929163feaf968c9160048083019260a0929190829003018186803b15801561135457600080fd5b505afa158015611368573d6000803e3d6000fd5b505050506040513d60a081101561137e57600080fd5b5080516020820151604083015160608401516080909401518a5193995091975095509193509091506113b990869086908690869086906113f8565b9a509a509a509a509a505050505050509091929394565b67ffffffffffffffff1660409190911b69ffff0000000000000000161790565b604081901c91565b600080600080600061140a868c6113d0565b8a8a8a6114178a8c6113d0565b939f929e50909c509a509098509650505050505050565b60028054604080518082018252600161ffff808516919091011680825273ffffffffffffffffffffffffffffffffffffffff9590951660209182018190527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000090931685177fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000084021790935560009384526004909252912080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b60408051808201909152600080825260208201529056fea264697066735822122023d8586f950acba6a0ffe61d2fe942dfed8f1e17cfa21687beac243094dd484c64736f6c63430006060033"
    };
});
define("@scom/oswap-chainlink-contract/contracts/AggregatorProxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/oswap-chainlink-contract/contracts/AggregatorProxy.json.ts"], function (require, exports, eth_contract_1, AggregatorProxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregatorProxy = void 0;
    class AggregatorProxy extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, AggregatorProxy_json_1.default.abi, AggregatorProxy_json_1.default.bytecode);
            this.assign();
        }
        deploy(aggregator, options) {
            return this.__deploy([aggregator], options);
        }
        parseAnswerUpdatedEvent(receipt) {
            return this.parseEvents(receipt, "AnswerUpdated").map(e => this.decodeAnswerUpdatedEvent(e));
        }
        decodeAnswerUpdatedEvent(event) {
            let result = event.data;
            return {
                current: new eth_contract_1.BigNumber(result.current),
                roundId: new eth_contract_1.BigNumber(result.roundId),
                updatedAt: new eth_contract_1.BigNumber(result.updatedAt),
                _event: event
            };
        }
        parseNewRoundEvent(receipt) {
            return this.parseEvents(receipt, "NewRound").map(e => this.decodeNewRoundEvent(e));
        }
        decodeNewRoundEvent(event) {
            let result = event.data;
            return {
                roundId: new eth_contract_1.BigNumber(result.roundId),
                startedBy: result.startedBy,
                startedAt: new eth_contract_1.BigNumber(result.startedAt),
                _event: event
            };
        }
        parseOwnershipTransferRequestedEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferRequested").map(e => this.decodeOwnershipTransferRequestedEvent(e));
        }
        decodeOwnershipTransferRequestedEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        parseOwnershipTransferredEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferred").map(e => this.decodeOwnershipTransferredEvent(e));
        }
        decodeOwnershipTransferredEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        assign() {
            let aggregator_call = async (options) => {
                let result = await this.call('aggregator', [], options);
                return result;
            };
            this.aggregator = aggregator_call;
            let decimals_call = async (options) => {
                let result = await this.call('decimals', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.decimals = decimals_call;
            let description_call = async (options) => {
                let result = await this.call('description', [], options);
                return result;
            };
            this.description = description_call;
            let getAnswer_call = async (roundId, options) => {
                let result = await this.call('getAnswer', [this.wallet.utils.toString(roundId)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getAnswer = getAnswer_call;
            let getRoundData_call = async (roundId, options) => {
                let result = await this.call('getRoundData', [this.wallet.utils.toString(roundId)], options);
                return {
                    roundId: new eth_contract_1.BigNumber(result.roundId),
                    answer: new eth_contract_1.BigNumber(result.answer),
                    startedAt: new eth_contract_1.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_1.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_1.BigNumber(result.answeredInRound)
                };
            };
            this.getRoundData = getRoundData_call;
            let getTimestamp_call = async (roundId, options) => {
                let result = await this.call('getTimestamp', [this.wallet.utils.toString(roundId)], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getTimestamp = getTimestamp_call;
            let latestAnswer_call = async (options) => {
                let result = await this.call('latestAnswer', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.latestAnswer = latestAnswer_call;
            let latestRound_call = async (options) => {
                let result = await this.call('latestRound', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.latestRound = latestRound_call;
            let latestRoundData_call = async (options) => {
                let result = await this.call('latestRoundData', [], options);
                return {
                    roundId: new eth_contract_1.BigNumber(result.roundId),
                    answer: new eth_contract_1.BigNumber(result.answer),
                    startedAt: new eth_contract_1.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_1.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_1.BigNumber(result.answeredInRound)
                };
            };
            this.latestRoundData = latestRoundData_call;
            let latestTimestamp_call = async (options) => {
                let result = await this.call('latestTimestamp', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.latestTimestamp = latestTimestamp_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let phaseAggregators_call = async (param1, options) => {
                let result = await this.call('phaseAggregators', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.phaseAggregators = phaseAggregators_call;
            let phaseId_call = async (options) => {
                let result = await this.call('phaseId', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.phaseId = phaseId_call;
            let proposedAggregator_call = async (options) => {
                let result = await this.call('proposedAggregator', [], options);
                return result;
            };
            this.proposedAggregator = proposedAggregator_call;
            let proposedGetRoundData_call = async (roundId, options) => {
                let result = await this.call('proposedGetRoundData', [this.wallet.utils.toString(roundId)], options);
                return {
                    roundId: new eth_contract_1.BigNumber(result.roundId),
                    answer: new eth_contract_1.BigNumber(result.answer),
                    startedAt: new eth_contract_1.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_1.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_1.BigNumber(result.answeredInRound)
                };
            };
            this.proposedGetRoundData = proposedGetRoundData_call;
            let proposedLatestRoundData_call = async (options) => {
                let result = await this.call('proposedLatestRoundData', [], options);
                return {
                    roundId: new eth_contract_1.BigNumber(result.roundId),
                    answer: new eth_contract_1.BigNumber(result.answer),
                    startedAt: new eth_contract_1.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_1.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_1.BigNumber(result.answeredInRound)
                };
            };
            this.proposedLatestRoundData = proposedLatestRoundData_call;
            let version_call = async (options) => {
                let result = await this.call('version', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.version = version_call;
            let acceptOwnership_send = async (options) => {
                let result = await this.send('acceptOwnership', [], options);
                return result;
            };
            let acceptOwnership_call = async (options) => {
                let result = await this.call('acceptOwnership', [], options);
                return;
            };
            this.acceptOwnership = Object.assign(acceptOwnership_send, {
                call: acceptOwnership_call
            });
            let confirmAggregator_send = async (aggregator, options) => {
                let result = await this.send('confirmAggregator', [aggregator], options);
                return result;
            };
            let confirmAggregator_call = async (aggregator, options) => {
                let result = await this.call('confirmAggregator', [aggregator], options);
                return;
            };
            this.confirmAggregator = Object.assign(confirmAggregator_send, {
                call: confirmAggregator_call
            });
            let proposeAggregator_send = async (aggregator, options) => {
                let result = await this.send('proposeAggregator', [aggregator], options);
                return result;
            };
            let proposeAggregator_call = async (aggregator, options) => {
                let result = await this.call('proposeAggregator', [aggregator], options);
                return;
            };
            this.proposeAggregator = Object.assign(proposeAggregator_send, {
                call: proposeAggregator_call
            });
            let transferOwnership_send = async (to, options) => {
                let result = await this.send('transferOwnership', [to], options);
                return result;
            };
            let transferOwnership_call = async (to, options) => {
                let result = await this.call('transferOwnership', [to], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    exports.AggregatorProxy = AggregatorProxy;
    AggregatorProxy._abi = AggregatorProxy_json_1.default.abi;
});
define("@scom/oswap-chainlink-contract/contracts/EACAggregatorProxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/oswap-chainlink-contract/contracts/EACAggregatorProxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }, { "internalType": "address", "name": "_accessController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
            { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "accessController", "outputs": [{ "internalType": "contract AccessControllerInterface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_accessController", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b50604051620026e8380380620026e8833981810160405260408110156200003757600080fd5b508051602090910151600080546001600160a01b031916331790558162000067816001600160e01b036200008416565b506200007c816001600160e01b03620000f316565b505062000175565b60028054604080518082018252600161ffff80851691909101168082526001600160a01b0395909516602091820181905261ffff19909316851762010000600160b01b0319166201000084021790935560009384526004909252912080546001600160a01b0319169091179055565b6000546001600160a01b0316331462000153576040805162461bcd60e51b815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600580546001600160a01b0319166001600160a01b0392909216919091179055565b61256380620001856000396000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c80638f6b4d91116100e3578063bc43cbaf1161008c578063f2fde38b11610066578063f2fde38b1461042b578063f8a2abd31461045e578063feaf968c146104915761018d565b8063bc43cbaf146103fa578063c159730414610402578063e8c4be30146104235761018d565b8063a928c096116100bd578063a928c0961461038d578063b5ab58dc146103c0578063b633620c146103dd5761018d565b80638f6b4d911461032957806392eefe9b146103315780639a6fc8f5146103645761018d565b80636001ac531161014557806379ba50971161011f57806379ba50971461030f5780638205bf6a146103195780638da5cb5b146103215761018d565b80636001ac5314610222578063668a0f021461028a5780637284e416146102925761018d565b806350d25bcd1161017657806350d25bcd146101e157806354fd4d50146101fb57806358303b10146102035761018d565b8063245a7bfc14610192578063313ce567146101c3575b600080fd5b61019a610499565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101cb6104bb565b6040805160ff9092168252519081900360200190f35b6101e9610559565b60408051918252519081900360200190f35b6101e96106e0565b61020b61074d565b6040805161ffff9092168252519081900360200190f35b61024b6004803603602081101561023857600080fd5b503569ffffffffffffffffffff16610757565b6040805169ffffffffffffffffffff96871681526020810195909552848101939093526060840191909152909216608082015290519081900360a00190f35b6101e9610978565b61029a610af9565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102d45781810151838201526020016102bc565b50505050905090810190601f1680156103015780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610317610c76565b005b6101e9610d78565b61019a610ef9565b61024b610f15565b6103176004803603602081101561034757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611134565b61024b6004803603602081101561037a57600080fd5b503569ffffffffffffffffffff16611201565b610317600480360360208110156103a357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661138b565b6101e9600480360360208110156103d657600080fd5b50356114ce565b6101e9600480360360208110156103f357600080fd5b5035611657565b61019a6117d9565b61019a6004803603602081101561041857600080fd5b503561ffff166117f5565b61019a61181d565b6103176004803603602081101561044157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611839565b6103176004803603602081101561047457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611935565b61024b611a02565b60025462010000900473ffffffffffffffffffffffffffffffffffffffff1690565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561052857600080fd5b505afa15801561053c573d6000803e3d6000fd5b505050506040513d602081101561055257600080fd5b5051905090565b60055460009073ffffffffffffffffffffffffffffffffffffffff168015806106675750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b15801561063a57600080fd5b505afa15801561064e573d6000803e3d6000fd5b505050506040513d602081101561066457600080fd5b50515b6106d257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6106da611b8b565b91505090565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b15801561052857600080fd5b60025461ffff1690565b600554600090819081908190819073ffffffffffffffffffffffffffffffffffffffff1680158061086d5750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b15801561084057600080fd5b505afa158015610854573d6000803e3d6000fd5b505050506040513d602081101561086a57600080fd5b50515b6108d857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff1661095c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b61096587611bf8565b939b929a50909850965090945092505050565b60055460009073ffffffffffffffffffffffffffffffffffffffff16801580610a865750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b158015610a5957600080fd5b505afa158015610a6d573d6000803e3d6000fd5b505050506040513d6020811015610a8357600080fd5b50515b610af157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6106da611d57565b6060600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b158015610b6657600080fd5b505afa158015610b7a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526020811015610bc157600080fd5b8101908080516040519392919084640100000000821115610be157600080fd5b908301906020820185811115610bf657600080fd5b8251640100000000811182820188101715610c1057600080fd5b82525081516020918201929091019080838360005b83811015610c3d578181015183820152602001610c25565b50505050905090810190601f168015610c6a5780820380516001836020036101000a031916815260200191505b50604052505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff163314610cfc57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e657200000000000000000000604482015290519081900360640190fd5b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b60055460009073ffffffffffffffffffffffffffffffffffffffff16801580610e865750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b158015610e5957600080fd5b505afa158015610e6d573d6000803e3d6000fd5b505050506040513d6020811015610e8357600080fd5b50515b610ef157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6106da611e2e565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b600554600090819081908190819073ffffffffffffffffffffffffffffffffffffffff1680158061102b5750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b158015610ffe57600080fd5b505afa158015611012573d6000803e3d6000fd5b505050506040513d602081101561102857600080fd5b50515b61109657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff1661111a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b611122611e9b565b95509550955095509550509091929394565b60005473ffffffffffffffffffffffffffffffffffffffff1633146111ba57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600554600090819081908190819073ffffffffffffffffffffffffffffffffffffffff168015806113175750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b1580156112ea57600080fd5b505afa1580156112fe573d6000803e3d6000fd5b505050506040513d602081101561131457600080fd5b50515b61138257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b61096587611fe4565b60005473ffffffffffffffffffffffffffffffffffffffff16331461141157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff82811691161461149a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e76616c69642070726f706f7365642061676772656761746f720000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001690556114cb81612117565b50565b60055460009073ffffffffffffffffffffffffffffffffffffffff168015806115dc5750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b1580156115af57600080fd5b505afa1580156115c3573d6000803e3d6000fd5b505050506040513d60208110156115d957600080fd5b50515b61164757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b611650836121de565b9392505050565b60055460009073ffffffffffffffffffffffffffffffffffffffff168015806117655750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b15801561173857600080fd5b505afa15801561174c573d6000803e3d6000fd5b505050506040513d602081101561176257600080fd5b50515b6117d057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b611650836122d8565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60046020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146118bf57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b60005473ffffffffffffffffffffffffffffffffffffffff1633146119bb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600554600090819081908190819073ffffffffffffffffffffffffffffffffffffffff16801580611b185750604080517f6b14daf8000000000000000000000000000000000000000000000000000000008152336004820181815260248301938452366044840181905273ffffffffffffffffffffffffffffffffffffffff861694636b14daf8946000939190606401848480828437600083820152604051601f9091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909201965060209550909350505081840390508186803b158015611aeb57600080fd5b505afa158015611aff573d6000803e3d6000fd5b505050506040513d6020811015611b1557600080fd5b50515b611b8357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e6f206163636573730000000000000000000000000000000000000000000000604482015290519081900360640190fd5b61112261239b565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561052857600080fd5b600354600090819081908190819073ffffffffffffffffffffffffffffffffffffffff16611c8757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b600354604080517f9a6fc8f500000000000000000000000000000000000000000000000000000000815269ffffffffffffffffffff89166004820152905173ffffffffffffffffffffffffffffffffffffffff90921691639a6fc8f59160248082019260a092909190829003018186803b158015611d0457600080fd5b505afa158015611d18573d6000803e3d6000fd5b505050506040513d60a0811015611d2e57600080fd5b508051602082015160408301516060840151608090940151929a91995097509195509350915050565b6000611d61612516565b5060408051808201825260025461ffff81168083526201000090910473ffffffffffffffffffffffffffffffffffffffff16602080840182905284517f668a0f0200000000000000000000000000000000000000000000000000000000815294519394611e1c9463668a0f0292600480840193919291829003018186803b158015611deb57600080fd5b505afa158015611dff573d6000803e3d6000fd5b505050506040513d6020811015611e1557600080fd5b50516124b8565b69ffffffffffffffffffff1691505090565b6000600260000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638205bf6a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561052857600080fd5b600354600090819081908190819073ffffffffffffffffffffffffffffffffffffffff16611f2a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4e6f2070726f706f7365642061676772656761746f722070726573656e740000604482015290519081900360640190fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b158015611f9257600080fd5b505afa158015611fa6573d6000803e3d6000fd5b505050506040513d60a0811015611fbc57600080fd5b5080516020820151604083015160608401516080909401519299919850965091945092509050565b60008060008060008060006120048869ffffffffffffffffffff166124d8565b61ffff821660009081526004602081905260408083205481517f9a6fc8f500000000000000000000000000000000000000000000000000000000815267ffffffffffffffff86169381019390935290519496509294509092839283928392839273ffffffffffffffffffffffffffffffffffffffff1691639a6fc8f59160248083019260a0929190829003018186803b1580156120a057600080fd5b505afa1580156120b4573d6000803e3d6000fd5b505050506040513d60a08110156120ca57600080fd5b508051602082015160408301516060840151608090940151929850909650945090925090506120fd85858585858c6124e0565b9b509b509b509b509b505050505050505091939590929450565b60028054604080518082018252600161ffff808516919091011680825273ffffffffffffffffffffffffffffffffffffffff9590951660209182018190527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000090931685177fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000084021790935560009384526004909252912080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b600069ffffffffffffffffffff8211156121fa575060006122d3565b600080612206846124d8565b61ffff8216600090815260046020526040902054919350915073ffffffffffffffffffffffffffffffffffffffff168061224657600093505050506122d3565b8073ffffffffffffffffffffffffffffffffffffffff1663b5ab58dc836040518263ffffffff1660e01b8152600401808267ffffffffffffffff16815260200191505060206040518083038186803b1580156122a157600080fd5b505afa1580156122b5573d6000803e3d6000fd5b505050506040513d60208110156122cb57600080fd5b505193505050505b919050565b600069ffffffffffffffffffff8211156122f4575060006122d3565b600080612300846124d8565b61ffff8216600090815260046020526040902054919350915073ffffffffffffffffffffffffffffffffffffffff168061234057600093505050506122d3565b8073ffffffffffffffffffffffffffffffffffffffff1663b633620c836040518263ffffffff1660e01b8152600401808267ffffffffffffffff16815260200191505060206040518083038186803b1580156122a157600080fd5b60008060008060006123ab612516565b5060408051808201825260025461ffff8116825262010000900473ffffffffffffffffffffffffffffffffffffffff166020820181905282517ffeaf968c0000000000000000000000000000000000000000000000000000000081529251919260009283928392839283929163feaf968c9160048083019260a0929190829003018186803b15801561243c57600080fd5b505afa158015612450573d6000803e3d6000fd5b505050506040513d60a081101561246657600080fd5b5080516020820151604083015160608401516080909401518a5193995091975095509193509091506124a190869086908690869086906124e0565b9a509a509a509a509a505050505050509091929394565b67ffffffffffffffff1660409190911b69ffff0000000000000000161790565b604081901c91565b60008060008060006124f2868c6124b8565b8a8a8a6124ff8a8c6124b8565b939f929e50909c509a509098509650505050505050565b60408051808201909152600080825260208201529056fea264697066735822122040161c76b658b26184655c863805897d7962d2515124e25c8f3fbe3321d99d0264736f6c63430006060033"
    };
});
define("@scom/oswap-chainlink-contract/contracts/EACAggregatorProxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/oswap-chainlink-contract/contracts/EACAggregatorProxy.json.ts"], function (require, exports, eth_contract_2, EACAggregatorProxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EACAggregatorProxy = void 0;
    class EACAggregatorProxy extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, EACAggregatorProxy_json_1.default.abi, EACAggregatorProxy_json_1.default.bytecode);
            this.assign();
        }
        deploy(params, options) {
            return this.__deploy([params.aggregator, params.accessController], options);
        }
        parseAnswerUpdatedEvent(receipt) {
            return this.parseEvents(receipt, "AnswerUpdated").map(e => this.decodeAnswerUpdatedEvent(e));
        }
        decodeAnswerUpdatedEvent(event) {
            let result = event.data;
            return {
                current: new eth_contract_2.BigNumber(result.current),
                roundId: new eth_contract_2.BigNumber(result.roundId),
                updatedAt: new eth_contract_2.BigNumber(result.updatedAt),
                _event: event
            };
        }
        parseNewRoundEvent(receipt) {
            return this.parseEvents(receipt, "NewRound").map(e => this.decodeNewRoundEvent(e));
        }
        decodeNewRoundEvent(event) {
            let result = event.data;
            return {
                roundId: new eth_contract_2.BigNumber(result.roundId),
                startedBy: result.startedBy,
                startedAt: new eth_contract_2.BigNumber(result.startedAt),
                _event: event
            };
        }
        parseOwnershipTransferRequestedEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferRequested").map(e => this.decodeOwnershipTransferRequestedEvent(e));
        }
        decodeOwnershipTransferRequestedEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        parseOwnershipTransferredEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferred").map(e => this.decodeOwnershipTransferredEvent(e));
        }
        decodeOwnershipTransferredEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        assign() {
            let accessController_call = async (options) => {
                let result = await this.call('accessController', [], options);
                return result;
            };
            this.accessController = accessController_call;
            let aggregator_call = async (options) => {
                let result = await this.call('aggregator', [], options);
                return result;
            };
            this.aggregator = aggregator_call;
            let decimals_call = async (options) => {
                let result = await this.call('decimals', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.decimals = decimals_call;
            let description_call = async (options) => {
                let result = await this.call('description', [], options);
                return result;
            };
            this.description = description_call;
            let getAnswer_call = async (roundId, options) => {
                let result = await this.call('getAnswer', [this.wallet.utils.toString(roundId)], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.getAnswer = getAnswer_call;
            let getRoundData_call = async (roundId, options) => {
                let result = await this.call('getRoundData', [this.wallet.utils.toString(roundId)], options);
                return {
                    roundId: new eth_contract_2.BigNumber(result.roundId),
                    answer: new eth_contract_2.BigNumber(result.answer),
                    startedAt: new eth_contract_2.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_2.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_2.BigNumber(result.answeredInRound)
                };
            };
            this.getRoundData = getRoundData_call;
            let getTimestamp_call = async (roundId, options) => {
                let result = await this.call('getTimestamp', [this.wallet.utils.toString(roundId)], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.getTimestamp = getTimestamp_call;
            let latestAnswer_call = async (options) => {
                let result = await this.call('latestAnswer', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.latestAnswer = latestAnswer_call;
            let latestRound_call = async (options) => {
                let result = await this.call('latestRound', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.latestRound = latestRound_call;
            let latestRoundData_call = async (options) => {
                let result = await this.call('latestRoundData', [], options);
                return {
                    roundId: new eth_contract_2.BigNumber(result.roundId),
                    answer: new eth_contract_2.BigNumber(result.answer),
                    startedAt: new eth_contract_2.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_2.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_2.BigNumber(result.answeredInRound)
                };
            };
            this.latestRoundData = latestRoundData_call;
            let latestTimestamp_call = async (options) => {
                let result = await this.call('latestTimestamp', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.latestTimestamp = latestTimestamp_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let phaseAggregators_call = async (param1, options) => {
                let result = await this.call('phaseAggregators', [this.wallet.utils.toString(param1)], options);
                return result;
            };
            this.phaseAggregators = phaseAggregators_call;
            let phaseId_call = async (options) => {
                let result = await this.call('phaseId', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.phaseId = phaseId_call;
            let proposedAggregator_call = async (options) => {
                let result = await this.call('proposedAggregator', [], options);
                return result;
            };
            this.proposedAggregator = proposedAggregator_call;
            let proposedGetRoundData_call = async (roundId, options) => {
                let result = await this.call('proposedGetRoundData', [this.wallet.utils.toString(roundId)], options);
                return {
                    roundId: new eth_contract_2.BigNumber(result.roundId),
                    answer: new eth_contract_2.BigNumber(result.answer),
                    startedAt: new eth_contract_2.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_2.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_2.BigNumber(result.answeredInRound)
                };
            };
            this.proposedGetRoundData = proposedGetRoundData_call;
            let proposedLatestRoundData_call = async (options) => {
                let result = await this.call('proposedLatestRoundData', [], options);
                return {
                    roundId: new eth_contract_2.BigNumber(result.roundId),
                    answer: new eth_contract_2.BigNumber(result.answer),
                    startedAt: new eth_contract_2.BigNumber(result.startedAt),
                    updatedAt: new eth_contract_2.BigNumber(result.updatedAt),
                    answeredInRound: new eth_contract_2.BigNumber(result.answeredInRound)
                };
            };
            this.proposedLatestRoundData = proposedLatestRoundData_call;
            let version_call = async (options) => {
                let result = await this.call('version', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.version = version_call;
            let acceptOwnership_send = async (options) => {
                let result = await this.send('acceptOwnership', [], options);
                return result;
            };
            let acceptOwnership_call = async (options) => {
                let result = await this.call('acceptOwnership', [], options);
                return;
            };
            this.acceptOwnership = Object.assign(acceptOwnership_send, {
                call: acceptOwnership_call
            });
            let confirmAggregator_send = async (aggregator, options) => {
                let result = await this.send('confirmAggregator', [aggregator], options);
                return result;
            };
            let confirmAggregator_call = async (aggregator, options) => {
                let result = await this.call('confirmAggregator', [aggregator], options);
                return;
            };
            this.confirmAggregator = Object.assign(confirmAggregator_send, {
                call: confirmAggregator_call
            });
            let proposeAggregator_send = async (aggregator, options) => {
                let result = await this.send('proposeAggregator', [aggregator], options);
                return result;
            };
            let proposeAggregator_call = async (aggregator, options) => {
                let result = await this.call('proposeAggregator', [aggregator], options);
                return;
            };
            this.proposeAggregator = Object.assign(proposeAggregator_send, {
                call: proposeAggregator_call
            });
            let setController_send = async (accessController, options) => {
                let result = await this.send('setController', [accessController], options);
                return result;
            };
            let setController_call = async (accessController, options) => {
                let result = await this.call('setController', [accessController], options);
                return;
            };
            this.setController = Object.assign(setController_send, {
                call: setController_call
            });
            let transferOwnership_send = async (to, options) => {
                let result = await this.send('transferOwnership', [to], options);
                return result;
            };
            let transferOwnership_call = async (to, options) => {
                let result = await this.call('transferOwnership', [to], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    exports.EACAggregatorProxy = EACAggregatorProxy;
    EACAggregatorProxy._abi = EACAggregatorProxy_json_1.default.abi;
});
define("@scom/oswap-chainlink-contract/contracts/Owned.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/oswap-chainlink-contract/contracts/Owned.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
            { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610304806100326000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806379ba5097146100465780638da5cb5b14610050578063f2fde38b14610081575b600080fd5b61004e6100b4565b005b6100586101b6565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61004e6004803603602081101561009757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166101d2565b60015473ffffffffffffffffffffffffffffffffffffffff16331461013a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e657200000000000000000000604482015290519081900360640190fd5b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461025857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a35056fea2646970667358221220fe6ae21e019f9dcc0c6ea44e0cb663dd8253cb37aea96939f5a880ca5956887964736f6c63430006060033"
    };
});
define("@scom/oswap-chainlink-contract/contracts/Owned.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/oswap-chainlink-contract/contracts/Owned.json.ts"], function (require, exports, eth_contract_3, Owned_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Owned = void 0;
    class Owned extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, Owned_json_1.default.abi, Owned_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseOwnershipTransferRequestedEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferRequested").map(e => this.decodeOwnershipTransferRequestedEvent(e));
        }
        decodeOwnershipTransferRequestedEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        parseOwnershipTransferredEvent(receipt) {
            return this.parseEvents(receipt, "OwnershipTransferred").map(e => this.decodeOwnershipTransferredEvent(e));
        }
        decodeOwnershipTransferredEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                to: result.to,
                _event: event
            };
        }
        assign() {
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let acceptOwnership_send = async (options) => {
                let result = await this.send('acceptOwnership', [], options);
                return result;
            };
            let acceptOwnership_call = async (options) => {
                let result = await this.call('acceptOwnership', [], options);
                return;
            };
            this.acceptOwnership = Object.assign(acceptOwnership_send, {
                call: acceptOwnership_call
            });
            let transferOwnership_send = async (to, options) => {
                let result = await this.send('transferOwnership', [to], options);
                return result;
            };
            let transferOwnership_call = async (to, options) => {
                let result = await this.call('transferOwnership', [to], options);
                return;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call
            });
        }
    }
    exports.Owned = Owned;
    Owned._abi = Owned_json_1.default.abi;
});
define("@scom/oswap-chainlink-contract/contracts/index.ts", ["require", "exports", "@scom/oswap-chainlink-contract/contracts/AggregatorProxy.ts", "@scom/oswap-chainlink-contract/contracts/EACAggregatorProxy.ts", "@scom/oswap-chainlink-contract/contracts/Owned.ts"], function (require, exports, AggregatorProxy_1, EACAggregatorProxy_1, Owned_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Owned = exports.EACAggregatorProxy = exports.AggregatorProxy = void 0;
    Object.defineProperty(exports, "AggregatorProxy", { enumerable: true, get: function () { return AggregatorProxy_1.AggregatorProxy; } });
    Object.defineProperty(exports, "EACAggregatorProxy", { enumerable: true, get: function () { return EACAggregatorProxy_1.EACAggregatorProxy; } });
    Object.defineProperty(exports, "Owned", { enumerable: true, get: function () { return Owned_1.Owned; } });
});
define("@scom/oswap-chainlink-contract", ["require", "exports", "@scom/oswap-chainlink-contract/contracts/index.ts"], function (require, exports, Contracts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Contracts = void 0;
    ///<amd-module name='@scom/oswap-chainlink-contract'/> 
    exports.Contracts = Contracts;
});
