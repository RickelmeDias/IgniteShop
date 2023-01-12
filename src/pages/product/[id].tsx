import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"
import { useContext, useState } from "react";
import Stripe from "stripe";
import { CartContext } from "../../contexts/CartContext";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceUnitAmount: number;
    description: string;
    defaultPriceId: string;
}

export interface ProductProps {
    product: Product
}

export default function ProductId({ product }: ProductProps) {
    const { query } = useRouter();
    const { addNewProduct } = useContext(CartContext)
    const { isFallback} = useRouter();

    if (isFallback) {
        return <p>Loading...</p>
    }

    function handleAddroduct() {
        addNewProduct(product)
    }

    return (
        <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt='' width={520} height={480} />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button onClick={handleAddroduct} >
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // preload products, usually best sellers or with more access
    return {
        paths: [
            { params: { id: 'prod_N95cO2O2UqkmdK'}}
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }: any) => {
    const productId = params["id"];
    const p = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price: any = p.default_price as Stripe.Price 

    return {
        props: {
            product: {
                id: p.id,
                name: p.name,
                imageUrl: p.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(price.unit_amount/100),
                priceUnitAmount: price.unit_amount,
                description: p.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1,
    }
}

