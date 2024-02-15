import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
   return (
      <PersistGate persistor={persistor}>
         <Provider store={store}>
            {children}
         </Provider>    
      </PersistGate>
   )
}

export default ReduxProvider