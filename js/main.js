let contract;
var connected = false;

async function show_candidates() {
    if (connected) {
        const cands = await contract.getCandidates();
        console.log(cands);
        var ul = document.getElementById("list");
        for (let i = 0; i < cands.length; i++) {
            var li = document.createElement("li");
            const val = ethers.utils.parseBytes32String(cands[i]);
            li.innerHTML = "<input id='default-radio-1' type='radio' value='' name='default-radio' class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'><label for='default-radio-1' class='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>" + val + "</label>";
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

        document.getElementById("loader").style.display = 'block';
        const add = await contract.addCandidate(name);
        console.log(add);
        const receip = await add.wait();
        document.getElementById("loader").style.display = 'none';
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
    const abi = '[{"inputs":[{"internalType":"bytes32","name":"nomeCognome","type":"bytes32"}],"name":"addCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCandidates","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"}]'
    const contractAddress = "0xECFDf9a4ec00D95b5a07996049371B708B3F4eA0"
    const contract1 = new ethers.Contract(contractAddress, abi, signer);
    contract = contract1;
    show_candidates();
}