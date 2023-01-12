import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
})

export const CartController = styled('div', {
    '.cart--open-true': {
        opacity: 1,
        animation: '0.2s ease-in-out'
    },
    '.cart--open-false': {
        display: 'none',
        opacity: 0,
        animation: '0.2s ease-in-out'
    },
})