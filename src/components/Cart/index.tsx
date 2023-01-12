import Image from "next/image";
import { X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CardProduct, CartContainer, CartFooter, CloseButton, ImageContainer, ProductsContainer } from "../../styles/components/cart";
import React from 'react';
import axios from "axios";

interface CartProps {
    open: boolean,
    handleCartOpen: () => void
}

export function Cart ({ open, handleCartOpen }: CartProps ) {
    const [ isCreatingCheckoutSession, setIsCreatingcheckoutSession ] = useState(false)

    const { listCart, removeProduct } = useContext(CartContext)
    const [ totalValue, setTotalValue ] = useState(0)

    useEffect(() => {
        let total = 0;
        for (const c of listCart) {
            total += c.priceUnitAmount;
        }
        setTotalValue(total)
    }, [listCart])
    
    function handleRemoveProduct(id: string): void {
            removeProduct(id)
    }

    function onMenuClose() {
        handleCartOpen()
    }

    async function handleFinishBuy() {
        try {
            setIsCreatingcheckoutSession(true)
            let listItems = [];
            for (const c of listCart) {
                listItems.push({
                    price: c.defaultPriceId,
                    quantity: 1
                })
            }
            const res = await axios.post('/api/checkout', { items: listItems })
            const { checkoutUrl } = res.data
            window.location.href = checkoutUrl
        } catch (err) {
            // Connect with a observability tool like datadog.
            setIsCreatingcheckoutSession(false)
            console.log(err)
            alert('Erro ao redirecionar ao checkout')
        }
    }

    return (
        <CartContainer className={`cart--open-${open}`}>
        <CloseButton onClick={onMenuClose}>
            <X size={24} weight="bold" />
        </CloseButton>
        <h3>Sacola de compras</h3>
        <ProductsContainer>
        {
            listCart.map(c => {
            return (
                <CardProduct key={c.defaultPriceId}>
                    <ImageContainer>
                        <Image src={c.imageUrl} alt="" width={90} height={90} />
                    </ImageContainer>
                    <span>
                        <p>{c.name}</p>
                        <strong>{c.price}</strong>
                        <button onClick={() => {handleRemoveProduct(c.defaultPriceId)}}><strong>Remover</strong></button>
                    </span>
                </CardProduct>
            )
            })
        }
        </ProductsContainer>
        <CartFooter>
            <div>
                <p>Quantidade</p>
                <span>{`${listCart.length} itens`}</span>
            </div>

            <div>
                <strong>Valor total</strong>
                <h4>{
                new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
            }).format(totalValue/100)}</h4>
            </div>
            <button onClick={handleFinishBuy} disabled={isCreatingCheckoutSession}>Finalizar compra</button>
        </CartFooter>
        </CartContainer>
    )
}