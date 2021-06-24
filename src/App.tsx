import React, { useCallback, useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'

// Components
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import PageLoader from './components/PageLoader'

//Contexts
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import EthAppProvider from './contexts/EthAppProvider'

// Theme
import theme from './theme'

// Views
const Home = lazy(() => import('./views/Home'))

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <EthAppProvider>
          <TransactionProvider>
              <ModalsProvider>{children}</ModalsProvider>
          </TransactionProvider>
        </EthAppProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
