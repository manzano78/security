import React from 'react'

import { createContext } from '@manzano/component-utils'
import { ISecurity, ISecurityProviderProps } from './Security-types'
import { useController } from './Security-controller'

const [SecurityContextProvider, useSecurity] = createContext<ISecurity>()

function SecurityProvider(props: ISecurityProviderProps) {
  const { initialUser, children} = props
  const { security } = useController(initialUser)

  return (
    <SecurityContextProvider value={security}>
      {children}
    </SecurityContextProvider>
  )
}

export { SecurityProvider, useSecurity }
