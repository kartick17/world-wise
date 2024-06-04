import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Form from './components/Form'
import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'
import SpinnerFullPage from './components/SpinnerFullPage'

const Login = lazy(() => import('./pages/Login'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const HomePage = lazy(() => import('./pages/Homepage'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route path='app' element={<ProtectedRoute />}>
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
