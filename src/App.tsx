import { useEffect } from "react"
import "./App.css"
import { Route, Routes, useNavigate } from "react-router-dom"
import { path } from "./path"
import { useAppDispatch } from "./hooks"
import { fetchAuthMe } from "./redux/slices/auth"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Home } from "./pages/Home/Home"
import { Header } from "./components/Header/Header"
import { fetchGetCards } from "./redux/slices/cards"

function App(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token") || null

    dispatch(fetchGetCards())

    if (!token) {
      return navigate(path.login)
    }

    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={path.home} element={<Home />} />
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
        </Routes>
      </main>
    </>
  )
}

export default App
