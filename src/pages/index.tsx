import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "phosphor-react";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}
 
export default function Home({ products }: HomeProps) {  
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,      
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(p => {
        return (
          <Link href={`/product/${p.id}`} key={p.id} prefetch={false}>
          <Product className="keen-slider__slide" >
            <Image src={p.imageUrl} alt={""} width={520} height={480} />
            <footer>
              <p>
                <strong>{p.name}</strong>
                <span>{p.price}</span>
              </p>
              <button><Handbag size={32} weight="bold" /></button>
            </footer>
          </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = res.data.map(p => {
    const price = p.default_price as Stripe.Price 
    if (price.unit_amount != null) 
      return {
        id: p.id,
        name: p.name,
        imageUrl: p.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount/100),
      }
    else
      return {}
  })

  return {
    props: {
      products
    },
    revalidate: 86400
  }
}