import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './/pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import PurchaseHistory from './pages/PurchaseHistory'

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
      </Routes>
    </div>
  )
}

export default App