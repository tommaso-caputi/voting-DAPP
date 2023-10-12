let contract;
var connected = false;

async function show_candidates() {
    show_loading(true)
    if (connected) {
        const cands = await contract.getAllCandidates();
        show_loading(false)
        console.log(cands);
        var ul = document.getElementById("list");
        for (let i = 0; i < cands[0].length; i++) {
            var li = document.createElement("li");
            const val = ethers.utils.parseBytes32String(cands[0][i]);
            const votes = cands[1][i];
            console.log(votes.toNumber())
            li.innerHTML = "<input id='default-radio-1' type='radio' value='' name='default-radio' class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'><label for='default-radio-1' class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>" + val + " &nbsp;" + votes + "</label>";
            ul.appendChild(li);
        }
    } else {
        alert("Connect wallet");
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function add_candidate() {
    if (connected) {
        var name = document.getElementById("name").value
        var name = ethers.utils.formatBytes32String(name);

        show_loading(true)
        const add = await contract.addCandidate(name);
        console.log(add);
        const receip = await add.wait();
        show_loading(false)
        console.log(receip);

        alert("Added " + document.getElementById("name").value);
        document.getElementById("list").innerHTML = "";
        show_candidates();
    } else {
        alert("Connect wallet");
    }
}

async function vote_candidate() {
    console.log("das");
}

async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log(signer);
    document.getElementById('connectButton').style.display = 'none';
    connected = true;
    const abi = '[ { "inputs": [ { "internalType": "bytes32", "name": "nomeCognome", "type": "bytes32" } ], "name": "addCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "nomeCognome", "type": "bytes32" } ], "name": "addVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAllCandidates", "outputs": [ { "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "nomeCognome", "type": "bytes32" } ], "name": "getVotes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]'
    const contractAddress = "0xeCac41161fd5978A4a3cEA2F6B39dDB4b3F51C4c"
    const contract1 = new ethers.Contract(contractAddress, abi, signer);
    contract = contract1;
    show_candidates();
}


function show_loading(bool) {
    if (bool) {
        console.log("start loading")
        document.getElementById("loader").style.display = 'block';
    } else {
        console.log("end loading")
        document.getElementById("loader").style.display = 'none';
    }
}