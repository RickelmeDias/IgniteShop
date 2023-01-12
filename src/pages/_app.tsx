import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { CartController, Container } from '../styles/pages/app'
import { CartContextProvider } from '../contexts/CartContext'
import { Cart } from '../components/Cart'
import { useState } from 'react'
import { HeaderComponent } from '../components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [ openCart, setOpenCart ] = useState(false)
  
  function handleCartOpen() {
    setOpenCart(!openCart)
  }

  return (
    <CartContextProvider>
      <CartController>
        <Cart open={openCart} handleCartOpen={handleCartOpen} />
      </CartController>
      <Container>
        <HeaderComponent handleCartOpen={handleCartOpen} />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
