import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import City from './components/City'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<p>City</p>} />
            <Route path='cities' element={<p>City</p>} />
            <Route path='countries' element={<p>Countries</p>} />
            <Route path='form' element={<p>FOrm</p>} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
