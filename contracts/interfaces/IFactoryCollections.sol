// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


interface IFactoryCollections {
    function collectionCreated(
        uint256 total_supply,
        string memory baseTokenURI,
        string memory name,
        string memory symbol
    ) external returns (address);

    function tokenMinted(
        address collection,
        address recipient,
        string memory tokenUri
    ) external;

    function setTokenURI(address collection, string memory newURI) external;

    event CollectionCreated(string name, string symbol, uint256 total_supply, address collection, string baseTokenURI);
    event TokenMinted(address collection, address recipient, uint256 tokenId, string tokenUri);
}