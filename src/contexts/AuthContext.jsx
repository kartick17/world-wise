import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
}

const USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    default:
      throw new Error('Invalid action type')
  }
}

function AuthProvider({ childern }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer()

  function login(email, password) {
    if (email === USER.email && password === USER.password)
      dispatch({ type: 'login', payload: USER })
  }

  function logout() {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {childern}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) throw new Error('AuthContext was used outside AuthProvider')
}

export { AuthProvider, useAuth }
