import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { EthApp } from '../../ethapp'

export interface EthAppContext {
  ethApp?: typeof EthApp
}

export const Context = createContext<EthAppContext>({
  ethApp: undefined,
})

declare global {
  interface Window {
    ethapp: any
  }
}

const EthAppProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [ethApp, setEthApp] = useState<any>()

  // @ts-ignore
  window.ethApp = ethApp
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const appLib = new EthApp(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setEthApp(appLib)
      window.ethapp = appLib
    }
  }, [ethereum])

  return <Context.Provider value={{ ethApp }}>{children}</Context.Provider>
}

export default EthAppProvider
