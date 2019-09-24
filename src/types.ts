export interface IUser {
  username: string
  roles: ReadonlyArray<string>
  [p: string]: any
}
