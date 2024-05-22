import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import PageNav from './components/PageNav'

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
