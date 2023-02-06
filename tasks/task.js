

// npx hardhat createCollection --contract 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --uri "ipfs//" --supply 3 --name "HZ nft" --symbol "HZ"
task("createCollection", "Create new collection")
    .addParam("contract", "Contract address")
    .addParam("supply", "supply")
    .addParam("uri", "uri")
    .addParam("name", "name")
    .addParam("symbol", "symbol")
    .setAction(async (taskArgs) => {
        const factoryContract = await ethers.getContractFactory("FactoryCollections");
        const FACTORY = factoryContract.attach(taskArgs.contract);
        await FACTORY.collectionCreated(taskArgs.supply, taskArgs.uri, taskArgs.name, taskArgs.symbol);
    })

/// npx hardhat createNFT --contract 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --uri "ipfs//" --collection "0x0000" --recipient "0x0000"
task("createNFT", "Create new collection")
    .addParam("contract", "Contract address")
    .addParam("uri", "uri")
    .addParam("collection", "collection")
    .addParam("recipient", "recipient")
    .setAction(async (taskArgs) => {
        const factoryContract = await ethers.getContractFactory("FactoryCollections");
        const FACTORY = factoryContract.attach(taskArgs.contract);
        await FACTORY.tokenMinted(taskArgs.collection, taskArgs.recipient, taskArgs.uri);
    })