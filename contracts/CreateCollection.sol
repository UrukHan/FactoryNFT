// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
* @title Our Collections Factory contract
*/
contract CreateCollection is ERC721, Ownable {
    // use Counters library
    using Counters for Counters.Counter;
    // variables
    uint256 public _total_supply;
    string public _baseTokenURI;
    Counters.Counter private _currentTokenId;

    /**
    * Contract constructor
    */
    constructor(
        uint256 total_supply,
        string memory baseTokenURI,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        _total_supply = total_supply;
        _baseTokenURI = baseTokenURI;
    }

    /**
    * @dev Mints a new token to recipient address
    * @param recipient new token owner address
    * @return tokenId minted token id
    */
    function mintTo(address recipient) public onlyOwner returns (uint256) {
        // check that max supply is not reached
        require(_currentTokenId.current() < _total_supply, "Max supply reached");
        // increase current token count and mint it to a new owner
        _currentTokenId.increment();
        uint256 newItemId = _currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    /**
    * @dev Sets base token URI
    * @param baseTokenURI base token URI
    */
    function setBaseTokenURI(string memory baseTokenURI) public onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    /**
    * @dev Returns base token URL
    * @return baseTokenURI base token URI
    */
    function _baseURI() internal virtual override view returns (string memory) {
        return _baseTokenURI;
    }
}
