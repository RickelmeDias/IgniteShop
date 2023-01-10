import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
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
          <Product className="keen-slider__slide" key={p.id}>
            <Image src={p.imageUrl} alt={""} width={520} height={480} />
            <footer>
              <strong>{p.name}</strong>
              <span>{p.price}</span>
            </footer>
          </Product>
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

    return {
      id: p.id,
      name: p.name,
      imageUrl: p.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 86400
  }
}