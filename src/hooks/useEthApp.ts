import { useContext } from 'react'
import { Context } from '../contexts/EthAppProvider'

const useEthApp = () => {
  const { ethApp } = useContext(Context)
  return ethApp
}

export default useEthApp
