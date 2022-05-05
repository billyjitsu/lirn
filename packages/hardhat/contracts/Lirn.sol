//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract LirnOnboard is ERC1155, Ownable {

    uint256 public constant Quiz1 = 1;
    uint256 public constant Quiz2 = 2;
    uint256 public constant Quiz3 = 3;

    string public LirnNFT =  'ipfs://QmPLT5TzcnDEML9jHfrcip7trFLokN7yAPGnpfBYxx3T6F/';  

    mapping(address => mapping (uint256 => uint256))  public supplyBalance;


    constructor() ERC1155(LirnNFT) {

    }


    function mintQuiz1(address _adr) external { // removed onlyOwner for demo
            require(supplyBalance[_adr][Quiz1] < 1, "Already owns Quiz1 NFT");
            _mint(_adr, Quiz1, 1, "");
            supplyBalance[msg.sender][Quiz1] += 1;
    }

    function mintQuiz2(address _adr) external {
            require(supplyBalance[_adr][Quiz2] < 1, "Already owns Quiz2 NFT");
            _mint(_adr, Quiz2, 1, "");
            supplyBalance[msg.sender][Quiz2] += 1;
    }

    function mintQuiz3(address _adr) external {
            require(supplyBalance[_adr][Quiz3] < 1, "Already owns Quiz3 NFT");
            _mint(_adr, Quiz3, 1, "");
            supplyBalance[msg.sender][Quiz3] += 1;
    }

    function burnToken(address _adr, uint256 _id) external onlyOwner {
            _burn(_adr, _id, 1);
            supplyBalance[msg.sender][_id] -= 1;
    }



    function name() public pure returns (string memory) {
        return "Lirn Onboard";
    }

    function symbol() public pure returns (string memory) {
        return "Lirn";
    }  

    // URI overide for number schemes
    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                LirnNFT,
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

    
    //Make Nontranferable
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
        // Ignore transfers during minting
        if (from == address(0)) {
            return;
        }
        require(
            to == address(0),
            "Cannot transfer knowledge fam"
        );
    }


}