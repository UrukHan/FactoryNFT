
const { ethers } = require("hardhat");
const { expect } = require("chai");
const {address} = require("hardhat/internal/core/config/config-validation");



describe("Factory Collections", function () {
    this.timeout(100000)

    let owner
    let accOne
    let accTwo
    let FACTORY
    let balanceOwner
    let deployCost
    let collecton = []
    let NFT = []

    it('Setup contracts', async () => {
        console.log("|     --------- Connect deploy ---------     |");
        [owner, accOne, accTwo] = await ethers.getSigners()


        const FactoryCollections = await ethers.getContractFactory("FactoryCollections", owner)
        FACTORY = await FactoryCollections.deploy()
        await FACTORY.deployed()

        balanceOwner = await owner.getBalance()
        deployCost = await 10000 - ethers.utils.formatEther(balanceOwner);
        console.log("\nDeploy Cost: ", deployCost)
    })

    describe('Create collection', async () => {
        it('Check create collection by user', async () => {
            await expect(FACTORY.connect(accOne).collectionCreated(3, "ipfs://hzzzz", "New collect", "NC")).to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('Check create collection by owner', async () => {
            let newCollecton = await FACTORY.collectionCreated(3, "ipfs://hzzzz", "First collect", "FC");
            let eventCollecton = await newCollecton.wait(1)
            collecton.push(eventCollecton.events[1].args.collection)
            newCollecton = await FACTORY.collectionCreated(3, "ipfs://hzzzz", "Second collect", "SC");
            eventCollecton = await newCollecton.wait(1)
            collecton.push(eventCollecton.events[1].args.collection)
        });
    });
    describe('Mint NFT', async () => {
        it('address collecton', async () => {
            let newNFT = await FACTORY.tokenMinted(collecton[0], owner.address, "ipfs://hzzzz");
            let eventNFT = await newNFT.wait(1)
            NFT = eventNFT.events[1].args
        });

    });

    describe('LOGGG', async () => {
        it('address collecton', async () => {
            console.log("\n       New collection address: ", collecton)
            console.log("\n       New NFT data: ", NFT)
        });

    });
})









