// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CreateCollection.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IFactoryCollections.sol";

/**
* @title Our Collections Factory contract
*/
contract FactoryCollections is Ownable, IFactoryCollections {
    // use Counters library
    using Counters for Counters.Counter;
    // variables
    Counters.Counter private _currentTokenId;
    mapping (address => string) private _collectionsURI;

    //    /**
    //     * Contract constructor
    //     */
    //    constructor() {
    //    }

    /**
        * @dev Create new collections
        * @param total_supply total supply collection
        * @param baseTokenURI base Token URI collection
        * @param name name collection
        * @param symbol symbol collection
    */
    function collectionCreated(
        uint256 total_supply,
        string memory baseTokenURI,
        string memory name,
        string memory symbol
    ) public override onlyOwner returns (address) {
        address collection = address(new CreateCollection(total_supply, baseTokenURI, name, symbol));
        _collectionsURI[collection] = baseTokenURI;
        emit CollectionCreated(name, symbol, total_supply, collection, baseTokenURI);
        return collection;
    }

    function tokenMinted(
        address collection,
        address recipient,
        string memory tokenUri
    ) public override onlyOwner {
        uint256 tokenId = CreateCollection(collection).mintTo(recipient);
        tokenUri = _collectionsURI[collection];
        emit TokenMinted(collection, recipient, tokenId, tokenUri);
    }

    /**
    * @dev Sets base token URI
    * @param collection collection
    * @param newURI newURI
    */
    function setTokenURI(address collection, string memory newURI) public override onlyOwner {
        CreateCollection(collection).setBaseTokenURI(newURI);
        _collectionsURI[collection] = newURI;
    }

}
