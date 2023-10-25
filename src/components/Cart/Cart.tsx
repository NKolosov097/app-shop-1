import { Button, Card, Drawer, Space } from "antd"
import React from "react"
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { priceRu, useAppDispatch, useAppSelector } from "../../hooks"
import {
  decCardInCart,
  incCardInCart,
  removeCardFromCart,
} from "../../redux/slices/cards"
import { ICardItem } from "../../types"

interface ICartProps {
  isOpenedCart: boolean
  handleOpenCart: () => void
}

export const Cart = ({
  isOpenedCart,
  handleOpenCart,
}: ICartProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector((state) => state.cards)

  let sum =
    cart.length > 0
      ? (cart as Array<ICardItem>).reduce(
          (acc, val) => acc + val.count * val.price,
          0
        )
      : 0

  const incCount = (id: string) => {
    dispatch(incCardInCart(id))
  }

  const decCount = (id: string) => {
    dispatch(decCardInCart(id))
  }

  const removeCard = (id: string) => {
    dispatch(removeCardFromCart(id))
  }

  return (
    <>
      <ShoppingCartOutlined onClick={handleOpenCart} />
      <Drawer
        title={`Корзина -  ${priceRu(sum)}`}
        placement="left"
        closable={false}
        onClose={handleOpenCart}
        open={isOpenedCart}
        style={{ textAlign: "center" }}
      >
        {cart.length > 0 ? (
          cart.map((card) => (
            <Card
              key={card._id}
              title={card.title}
              style={{ marginTop: 20 }}
              cover={<img alt={card.title} src={card.imageURL} />}
            >
              <Space size={25} wrap>
                <Space size={[8, 16]} wrap>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => decCount(card._id)}
                  />
                  <span style={{ fontSize: 20 }}>{card.count}</span>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => incCount(card._id)}
                  />
                </Space>
                <span style={{ fontSize: 20 }}>
                  {card.count ? priceRu(card.count * card.price) : 0}
                </span>
                <Button
                  danger
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => removeCard(card._id)}
                />
              </Space>
            </Card>
          ))
        ) : (
          <Space size={25} style={{ fontSize: 20, marginTop: "40vh" }}>
            В корзине пока ничего нет...
          </Space>
        )}
      </Drawer>
    </>
  )
}
