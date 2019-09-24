import { ISecurity, IUser } from './Security-types'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { isNotEmpty } from './Security-utils'

const ANONYMOUS_USER: IUser = { username: 'anonymous', roles: [] }

export function useController(
  providedUser = ANONYMOUS_USER,
  enableUpdate = false
) {
  const [user, setUser] = useState(providedUser)
  const security = useMemo(() => toSecurity(user, setUser), [user])

  if (enableUpdate && providedUser !== user) {
    setUser(providedUser)
  }

  return { security }
}

function toSecurity(
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
): ISecurity {
  const roles = new Set(user.roles)
  const isAnonymous = user === ANONYMOUS_USER
  const isAuthenticated = !isAnonymous
  const hasRole = (role: string) => roles.has(role)

  return {
    user,
    setUser,
    isAnonymous,
    isAuthenticated,
    hasRole,
    hasAnyRole: (...roles) => {
      return isNotEmpty(roles) && roles.some((role) => hasRole(role))
    },
    hasAllRoles: (...roles) => {
      return isNotEmpty(roles) && roles.every((role) => hasRole(role))
    },
    invalidateUser: () => {
      setUser(ANONYMOUS_USER)
    }
  }
}
