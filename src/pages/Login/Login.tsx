import { Button, Form, Input } from "antd"
import { IAuthForm, IDataLogin, IUser } from "../../types"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchLogin } from "../../redux/slices/auth"
import { Link, Navigate } from "react-router-dom"
import { path } from "../../path"

export const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const onFinish = (values: IDataLogin) => {
    dispatch(fetchLogin({ email: values.email, password: values.password }))
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
        margin: " 20% auto",
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<IAuthForm>
        label="email"
        name="email"
        rules={[{ required: true, message: "Пожалуйста, введите Email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item<IAuthForm>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <span style={{ marginLeft: "30px" }}>
          <Link to={path.register}>Регистрация</Link>
        </span>
      </Form.Item>
    </Form>
  )
}
