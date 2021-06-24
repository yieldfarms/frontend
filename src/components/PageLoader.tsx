import React from 'react'
import styled from 'styled-components'
import Page from './Page'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Page>
        <Wrapper>
            Loading Page...
        </Wrapper>
    </Page>
  )
}

export default PageLoader