import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IUser {
  username: string
  roles: ReadonlyArray<string>
  [p: string]: any
}

export interface ISecurity {
  user: IUser
  isAnonymous: boolean
  isAuthenticated: boolean
  setUser: Dispatch<SetStateAction<IUser>>
  hasRole(role: string): boolean
  hasAnyRole(...roles: string[]): boolean
  hasAllRoles(...roles: string[]): boolean
  invalidateUser(): void
}

export interface ISecurityProviderProps {
  user?: IUser
  enableUpdate?: boolean
  children?: ReactNode | ((security: ISecurity) => ReactNode)
}
