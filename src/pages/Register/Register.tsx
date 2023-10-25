import { Button, Form, Input } from "antd"
import { IAuthForm, IDataRegister, IUser } from "../../types"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchRegister } from "../../redux/slices/auth"
import { Link, Navigate } from "react-router-dom"
import { path } from "../../path"

export const Register = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const onFinish = (values: IDataRegister) => {
    dispatch(fetchRegister(values))
  }

  if (!!(data as IUser)?._id) {
    return <Navigate to={path.home} replace />
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: "50%",
        height: "calc(100vh - 20%)",
        margin: "20% auto",
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<IAuthForm>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Пожалуйста, введите Email!" }]}
      >
        <Input
          type="email"
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="First name"
        name="firstName"
        rules={[{ required: true, message: "Пожалуйста, имя!" }]}
      >
        <Input
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: "Пожалуйста, введите фамилию!" }]}
      >
        <Input
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="Phone"
        name="mobilePhone"
        rules={[{ required: true, message: "Пожалуйста, номер телефона!" }]}
      >
        <Input
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="Address"
        name="address"
        rules={[{ message: "Пожалуйста, введите адрес!" }]}
      >
        <Input
          style={{
            marginLeft: "20px",
          }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
        <Button
          style={{
            marginLeft: "20px",
          }}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
        <span style={{ marginLeft: "30px" }}>
          <Link to={path.login}>Авторизация</Link>
        </span>
      </Form.Item>
    </Form>
  )
}
