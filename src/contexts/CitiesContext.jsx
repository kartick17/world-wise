import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react'

const CitiesContext = createContext()
const BASE_URL = `http://localhost:8000`

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      }
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      }
    case 'city/loaded':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      }
    case 'city/added':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      }
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      throw new Error('Invalid action type.')
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()

        dispatch({ type: 'cities/loaded', payload: data })
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error on loading cities...',
        })
      }
    }
    fetchCities()
  }, [])

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()

      dispatch({ type: 'city/loaded', payload: data })
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error on loading city...',
      })
    }
  })

  async function addCity(city) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      dispatch({ type: 'city/added', payload: data })
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error on adding city...',
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      dispatch({ type: 'city/deleted', payload: id })
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error on deleting city...',
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)

  if (!context)
    throw new Error('CitiesContext was used outside the CitiesProvider')

  return context
}

export { CitiesProvider, useCities }
