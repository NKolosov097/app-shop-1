import { useState } from "react"
import { EyeOutlined } from "@ant-design/icons"
import { Card, Col, Image, Modal, Space, Tag } from "antd"
import { ICardItem } from "../../types"

export const FullCard = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ICardItem | null>(null)
  return (
    <>
      {/* <Modal
        title={modalInfo?.title}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <div style={{ position: "absolute", bottom: 25, right: 200 }}>
          {modalInfo?.viewsCount}&nbsp;&nbsp;
          <EyeOutlined />
        </div>
        <Image width={"100%"} src={modalInfo?.imageURL} preview={false} />
        <Space style={{ marginTop: 30 }} size={[0, 4]} wrap>
          {modalInfo?.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      </Modal>
      <Col span={8} key={card._id}>
        <Card
          onClick={() => openModal(card)}
          title={card.title}
          style={{
            minHeight: 400,
            margin: "20px 10px",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Image width={"100%"} src={card.imageURL} preview={false} />
          <Space style={{ marginTop: 30 }} size={[0, 4]} wrap>
            {card.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
          <div style={{ position: "absolute", bottom: 20, right: 20 }}>
            {card.viewsCount}&nbsp;&nbsp;
            <EyeOutlined />
          </div>
        </Card>
      </Col> */}
    </>
  )
}
