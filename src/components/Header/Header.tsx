import React, { useEffect, useState } from "react"
import { message, Layout, Typography } from "antd"
import { Link, useLocation } from "react-router-dom"
import { path } from "../../path"
import { IUser, IDataError, IDataErrorFromBackend } from "../../types"
import { useAppSelector } from "../../hooks"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/auth"
import { Cart } from "../Cart/Cart"

const { Header: HeaderEl, Content } = Layout
const { Text } = Typography

const headerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  zIndex: 100,
  width: "1440px",
  height: "50px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  fontSize: 24,
  background: "#fff",
  borderRadius: "0 0 20px 20px",
}

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  alignItems: "baseline",
  justifyContent: "center",
  display: "flex",
  fontSize: 24,
}

export const Header = (): React.JSX.Element => {
  const { pathname } = useLocation()
  const [isOpenedCart, setIsOpenedCart] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const handleOpenCart = () => {
    setIsOpenedCart(!isOpenedCart)
  }

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const errorMessage = data
      ? (data as IDataError)?.message ||
        (data as Array<IDataErrorFromBackend>)[0]?.msg
      : null
    const isAuth = localStorage.getItem("token") && (data as IUser)?.firstName

    if (errorMessage || !isAuth) {
      messageApi.info({
        type: "info",
        duration: 2,
        content: `${errorMessage ? "Что-то пошло не так..." : "До встречи!"}`,
      })
    } else {
      messageApi.success({
        type: "success",
        duration: 2,
        content: `Здравствуйте, ${(data as IUser)?.firstName}`,
      })
    }
  }, [data, messageApi])

  return (
    <>
      {contextHolder}
      <HeaderEl style={headerStyle}>
        {pathname === path.login || pathname === path.register ? (
          <Content style={headerStyle} title="Shop">
            Shop
          </Content>
        ) : (
          <>
            <Content style={contentStyle} title="Корзина">
              <Cart
                isOpenedCart={isOpenedCart}
                handleOpenCart={handleOpenCart}
              />
            </Content>
            <Content style={contentStyle} title="Shop">
              Shop
            </Content>
            <Content style={contentStyle} title="Ваше имя">
              {(data as IUser)?.firstName}
              <Link
                style={{ marginLeft: 20 }}
                to={path.login}
                onClick={() => dispatch(logout())}
              >
                <Text style={contentStyle} type="danger" title="Выйти">
                  Выйти
                </Text>
              </Link>
            </Content>
          </>
        )}
      </HeaderEl>
    </>
  )
}
