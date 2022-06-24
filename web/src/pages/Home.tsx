import React, { useState, useEffect } from 'react'
import NavBar from '../ui-library/components/NavBar'
import UserNavBar from '../ui-library/components/UserNavBar'
import ProductList from '../ui-library/components/ProductList'
import { authValidation } from '../auth/index'

type Props = {}

const Home = (props: Props) => {
  const [user, setUser] = useState<boolean>(false)

  useEffect(  () => {
    userControl()
  }, [])

  const userControl = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      if(await authValidation(token)) {
        setUser(true)
      }
    }
  }

  return (
    <div>
      {
        user ? <UserNavBar /> : <NavBar />
      }
      <ProductList />
    </div>
  )
}

export default Home