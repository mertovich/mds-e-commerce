import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './/pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import PurchaseHistory from './pages/PurchaseHistory'
import ProductAdd from './pages/ProductAdd'
import Detail from './pages/Detail'
import ProductCategory from './pages/ProductCategory'

type Props = {}

const App = (props: Props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path='/product-add' element={<ProductAdd />} />
        <Route path='/product/:id' element={<Detail />} />
        <Route path='/products/:category' element={<ProductCategory />} />
      </Routes>
    </div>
  )
}

export default App