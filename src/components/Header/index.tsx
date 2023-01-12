import Logo from '../../assets/Logo.svg'
import { Handbag } from 'phosphor-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Header } from '../../styles/components/header'

interface HeaderProps {
    handleCartOpen: () => void
}

export function HeaderComponent ({ handleCartOpen }: HeaderProps) {
    const { listCart } = useContext(CartContext)

    return (
        <Header>
        <Link href={'/'}>
          <Image src={Logo.src} alt="" width={Logo.width} height={Logo.height} />
        </Link>
        <button onClick={handleCartOpen}>
          {
            listCart !== undefined && listCart.length > 0 &&
            (<p>{listCart.length > 10 ? '+9' : listCart.length.toString()}</p>)
          }
          <Handbag size={24} weight="bold" />
        </button>
      </Header>
    )
}