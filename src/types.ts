export const enum Status {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export interface IAuthForm {
  email: string
  firstName: string
  lastName: string
  password: string
  mobilePhone: string
  address?: string
  avatarURL?: string
  remember?: boolean
}

export interface IDataLogin extends Pick<IAuthForm, "email" | "password"> {}

export interface IDataRegister extends Omit<IAuthForm, "remember"> {}

export interface IUser
  extends Pick<IAuthForm, "email" | "firstName" | "lastName" | "mobilePhone"> {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  token?: string
}

export interface IDataErrorFromBackend {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export interface IDataError {
  message: string
}

export interface IAuthSlicer {
  data: IUser | IDataError | Array<IDataErrorFromBackend> | null
  status: Status
}

export interface ICardItem {
  _id: string
  title: string
  description: string
  price: number
  tags: Array<string>
  imageURL: string
  viewsCount: number
  user: IUser
  count: number
}

export interface ICardsSlicer {
  data: Array<ICardItem> | IDataError | Array<IDataErrorFromBackend> | null
  item: ICardItem | IDataError | null
  cart: Array<ICardItem> | []
  status: Status
}
