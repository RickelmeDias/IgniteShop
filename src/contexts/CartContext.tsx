import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { Product } from "../pages/product/[id]"
  
interface CartContextType {
    listCart: Product[];
    addNewProduct: (newProduct: Product) => void;
    removeProduct: (id: string) => void;
}
  
export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
    children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
const [listCart, setListCart] = useState<Product[]>([]);

function removeProduct(defaultPriceId: string) {
    const isProductOnCart = listCart.find((c) => c.defaultPriceId === defaultPriceId);
    if (isProductOnCart) {
        const deletedItem = listCart.filter((c) => c.defaultPriceId !== defaultPriceId);
        setListCart(deletedItem);
    }
}

function addNewProduct(newProduct: Product) {
    const isProductOnCart = listCart.find((c) => c.defaultPriceId === newProduct.defaultPriceId);
    if (isProductOnCart) {
        alert("Voce ja adicionou esse produto no carrinho, tente outro.")
    }else{
        setListCart((state) => [...state, newProduct]);
    }
}

useEffect(() => {
    console.log(listCart);
}, [listCart]);

return (
    <CartContext.Provider
    value={{
        listCart,
        addNewProduct,
        removeProduct,
    }}
    >
    {children}
    </CartContext.Provider>
);
}