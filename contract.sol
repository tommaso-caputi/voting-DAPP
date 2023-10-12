// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract ContrattoVotazioni {
    mapping(bytes32 => uint256) private candidates;
    bytes32[] private candidateList;
    mapping(address => bool) private hasVoted;

    function addCandidate(bytes32 nomeCognome) public {
        candidates[nomeCognome] = 0;
        candidateList.push(nomeCognome);
    }

    function addVote(bytes32 nomeCognome) public {
        require(!hasVoted[msg.sender], "Address has already voted.");
        candidates[nomeCognome]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(bytes32 nomeCognome) public view returns (uint256) {
        return candidates[nomeCognome];
    }

    function getAllCandidates()
        public
        view
        returns (bytes32[] memory, uint256[] memory)
    {
        uint256 candidateCount = candidateList.length;
        bytes32[] memory names = new bytes32[](candidateCount);
        uint256[] memory votes = new uint256[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            bytes32 candidateName = candidateList[i];
            names[i] = candidateName;
            votes[i] = candidates[candidateName];
        }

        return (names, votes);
    }
}
