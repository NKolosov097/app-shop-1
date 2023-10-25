import React, { useState } from "react"
import { Card, Col, Image, Modal, Row, Skeleton, Space, Tag } from "antd"
import { message } from "antd"
import { priceRu, useAppDispatch, useAppSelector } from "../../hooks"
import { Navigate } from "react-router-dom"
import {
  ICardItem,
  IDataError,
  IDataErrorFromBackend,
  IUser,
} from "../../types"
import { path } from "../../path"
import { Content } from "antd/es/layout/layout"
import { incCardInCart } from "../../redux/slices/cards"

const contentStyle: React.CSSProperties = {
  alignItems: "baseline",
  display: "flex",
  fontSize: 17,
  lineHeight: 1.2,
  marginTop: 10,
}

export const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ICardItem | null>(null)
  const cards = useAppSelector((state) => state.cards.data)
  const user = useAppSelector((state) => state.auth.data)

  const openModal = (card: ICardItem) => {
    setIsModalOpen(true)
    setModalInfo(card)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalInfo(null)
  }

  const addToCart = (card: ICardItem | null) => {
    dispatch(incCardInCart(card?._id))
    messageApi.success({
      type: "success",
      duration: 2,
      content: `Товар "${card?.title}" добавлен в корзину`,
    })
  }

  if (!(user as IUser)?._id) {
    return <Navigate to={path.login} replace />
  }

  const isCards =
    (cards as Array<ICardItem>)?.length > 0 &&
    (cards as IDataError)?.message &&
    (cards as Array<IDataErrorFromBackend>)[0]?.msg &&
    cards
      ? cards
      : cards

  return (
    <>
      {contextHolder}
      <Row gutter={16} style={{ marginTop: 50 }}>
        {isCards
          ? (cards as Array<ICardItem>)?.map((card) => (
              <Col span={8} key={card._id}>
                <Modal
                  title={`${modalInfo?.title} - ${
                    modalInfo?.price ? priceRu(modalInfo.price) : "0 ₽"
                  }`}
                  open={isModalOpen}
                  okText={"Добавить в корзину"}
                  cancelText="Отмена"
                  onOk={() => addToCart(modalInfo ? modalInfo : null)}
                  onCancel={closeModal}
                  centered
                >
                  <Image
                    width={"100%"}
                    src={modalInfo?.imageURL}
                    preview={false}
                  />

                  <Content style={contentStyle}>
                    {modalInfo?.description}
                  </Content>

                  <Space style={{ marginTop: 30 }} size={[0, 4]} wrap>
                    {modalInfo?.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Modal>
                <Card
                  hoverable
                  onClick={() => openModal(card)}
                  title={`${card.title} - ${priceRu(card.price)}`}
                  style={{
                    minHeight: 400,
                    margin: "20px 10px",
                    position: "relative",
                  }}
                >
                  <Image width={"100%"} src={card.imageURL} preview={false} />
                  <Space style={{ marginTop: 30 }} size={[0, 4]} wrap>
                    {card.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Card>
              </Col>
            ))
          : [...new Array(5)].map((card, index) => (
              <Col span={8} key={index}>
                <Skeleton
                  style={{
                    minHeight: 400,
                    margin: "20px 10px",
                    position: "relative",
                    borderRadius: 10,
                  }}
                  active
                >
                  <Card
                    title={card ? card.title : ""}
                    style={{ height: 400, margin: "20px 10px" }}
                  >
                    <Image
                      width={"100%"}
                      src={card ? card.imageURL : ""}
                      preview={false}
                    />
                  </Card>
                </Skeleton>
              </Col>
            ))}
      </Row>
    </>
  )
}
