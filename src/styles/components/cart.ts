import { styled } from "..";

export const CartContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    background: '$gray800',
    maxWidth: 480,
    width: '100%',
    height: '100vh',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    padding: '3rem',
    gap: '3rem',
    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

    h3: {
        fontSize: '$lg',
    },
})

export const CartFooter = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    width: '100%',
    
    div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        span: {
            fontSize: '$md'
        }
    },

    strong: {
        fontSize: '$md'
    },

    button: {
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',
        marginTop: '3rem',

        '&:not(:disabled):hover': {
            backgroundColor: '$green300'
        },

        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 0.6,
        }
    },
})

export const CardProduct = styled('div', {
    display: 'flex',
    gap: '1.25rem', 
    
    span: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap:'0.5rem'
    },

    button: {
        background: 'transparent',
        border: 'none',
        color: '$green500',
        fontSize: '$md',

        '&:hover': {
            color: '$green300',
            cursor: 'pointer'
        }
    }
})

export const ImageContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

    img: {
        objectFit: 'cover'
    }
})

export const ProductsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    fontSize: '$md',
    flex: 1,
    overflow: 'auto',
    width: '100%',
    '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '$green300',
        borderRadius: '24px',
      },
})

export const CloseButton = styled('button', {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: '$gray300',
    width: '100%',

    '&:hover': {
        cursor: 'pointer'
    }
})