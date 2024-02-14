import ReduxProvider from "./ReduxProvider"
import RouteTag from "./Route"

const App = () => {
  // console.log("App rendered...")
  return (
    <ReduxProvider>
      <RouteTag />
    </ReduxProvider>
  )
}

export default App

// 12AC