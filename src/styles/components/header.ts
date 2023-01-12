import { styled } from "..";

export const Header = styled('header', {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',

    button: {
        position: 'relative',
        border: 'none',
        background: '$gray800',
        color: '$gray300',
        borderRadius: 8,
        padding: '0.75rem',
        
        '&:hover': {
            background: '$gray800',
            filter: 'brightness(1.5)',
            cursor: 'pointer',
        },

        p: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '28px',
            height: '28px',
            fontWeight: 'bold',
            background: '$green500',
            color: '$white',
            borderRadius: '50%',
            border: 'solid 4px $gray900'
        }
    },
})
