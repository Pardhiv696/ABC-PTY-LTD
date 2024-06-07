const { ethers, BigNumber } = require('ethers');
const { MaxUint256 } = require('@ethersproject/constants');
const tokenAbi = require('./Abi.json');

const walletGeneration = (walletCount) => {
    const hdnode = ethers.utils.HDNode.fromMnemonic(process.env.MID_MNEMONIC);
    const path = "m/44'/60'/0'/0/";
    const walletNode = hdnode.derivePath(path + walletCount.toString());
    const wallet = walletNode.address;

    return wallet;
};

const contractAddress = '0x66c31A8bADBe9775822EB28b46B1EffA76B27287';

const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-sepolia.g.alchemy.com/v2/JuMaKk6t6LYE-j1qHldPgtTdc8z0q2md',
);

function calculateGasMargin(value) {
    return +(
        (value * BigNumber.from(10000).add(BigNumber.from(1000))) /
        BigNumber.from(10000)
    ).toFixed(0);
}
const gasEstimationPayable = async (account, fn, data, amount) => {
    if (account) {
        const estimateGas = await fn(...data, MaxUint256).catch(() => {
            return fn(...data, { value: amount.toString() });
        });
        return calculateGasMargin(estimateGas);
    }
};
const gasEstimationForAll = async (account, fn, data) => {
    if (account) {
        const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(() => {
            return fn(...data);
        });
        return calculateGasMargin(estimateGas);
    }
};

module.exports = {
    walletGeneration,
    contractAddress,
    gasEstimationForAll,
    gasEstimationPayable,
    provider,
    tokenAbi,
};
