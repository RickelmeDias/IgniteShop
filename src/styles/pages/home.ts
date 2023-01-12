import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
    marginLeft: 'auto',
    minHeight: 550
});

export const Product = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',

    img: {
        objectFit: 'cover'
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',

        borderRadius: 6,
        padding: '2rem',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0,0,0,0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        p: {
            display:'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            strong: {
                fontSize: '$lg',
                color: '$gray100'
            },
    
            span: {
                fontSize: '$xl',
                fontWeight: 'bold',
                color: '$green300'
            },      
        },

        button: {
            border: 'none',
            background: '$green500',
            color: '$white',
            borderRadius: 8,
            padding: '0.75rem',
            
            '&:hover': {
                background: '$green300',
                cursor: 'pointer',
            },
        },
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1
        }
    }
});