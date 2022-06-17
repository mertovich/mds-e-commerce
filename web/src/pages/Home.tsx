import React from 'react'
import NavBar from '../ui-library/components/NavBar'
import ProductList from '../ui-library/components/ProductList'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <NavBar/>
      <ProductList/>
    </div>
  )
}

export default Home