import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

// Fetch contracts here to interact with them.
// export const getFooBarContract = (ethapp) => {
// return ethapp && ethapp.contracts && ethapp.contracts.foobar
//}

// You can add smart contract methods here.