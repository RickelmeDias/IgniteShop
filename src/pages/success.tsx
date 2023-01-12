import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ProductsSoldContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
    customerName: string
    products: {
        id: string
        name: string
        imageUrl: string
    }[]
}

export default function Success({ customerName, products }: SuccessProps) {
    return (
        <>
        <Head>
            <title>Compra efetuada | Ignite Shop</title>
            <meta name="robots" content="noindex" />
        </Head>
        <SuccessContainer>
            <h1>Compra efetuada!</h1>
            <ProductsSoldContainer>
            {
                products.map(p => {
                    return (
                    <ImageContainer key={p.id}>                
                        <Image src={p.imageUrl} alt='' width={120} height={120} />
                    </ImageContainer>
                )})
            }
            </ProductsSoldContainer>
            <p>Uhuul <strong>{customerName}</strong>, <strong>{products.length == 1 ? `sua ${products[0].name}` : `seus ${products.length} items`}</strong> já está a caminho da sua casa. </p>

            <Link href='/'>
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // cs_test_b1lf9XitOmhsh2hgo5r5CtPccPmTUUqRx6aDXQbTLRwFywnnvHYnRzjCnL

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id);

    const session: any = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    })
    
    const customerName = session.customer_details.name
    const products = session.line_items.data

    let productsList = []
    
    for (const pro of products) {
        const product = {
            id: pro.id,
            name: pro.price.product.name,
            imageUrl: pro.price.product.images[0]
        }
        productsList.push(product)
    }
    
    return {
        props: {
            customerName,
            products: productsList
        }
    }
}