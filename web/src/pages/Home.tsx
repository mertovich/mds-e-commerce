import React, { useState, useEffect } from 'react'
import NavBar from '../ui-library/components/NavBar'
import UserNavBar from '../ui-library/components/UserNavBar'
import ProductList from '../ui-library/components/ProductList'
import { authValidation } from '../auth/index'
import { Skeleton } from '@chakra-ui/react'

type Props = {}

const Home = (props: Props) => {
  const [user, setUser] = useState<boolean | null>(false)
  const [login, setLogin] = useState<boolean>(false)

  useEffect(() => {
    userControl()
  }, [])

  const userControl = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      let user = await authValidation(token)
      if (user) {
        setUser(user)
        setLogin(true)
      } else {
        setUser(false)
        setLogin(true)
      }
    } else {
      setUser(false)
      setLogin(true)
    }
  }

  return (
    <div>
      <Skeleton
        isLoaded={login}
      >
        {
          user ? <UserNavBar /> : <NavBar />
        }
        <ProductList />
      </Skeleton>
    </div>
  )
}

export default Home