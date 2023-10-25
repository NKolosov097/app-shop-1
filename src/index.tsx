import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import store from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

const container = document.getElementById("root")!
const root = createRoot(container)
let persitor = persistStore(store)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persitor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
