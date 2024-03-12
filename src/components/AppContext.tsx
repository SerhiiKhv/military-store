'use client'

import React, {createContext, ReactNode, useEffect, useState} from "react";
import {SessionProvider} from "next-auth/react";
import toast from "react-hot-toast";

interface CartContextProps {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: any, size?: any, extras?: any[] | undefined) => void;
    removeCartProduct: (indexToRemove: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function AppProvider({children}: { children: ReactNode }) {
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            const storedCart = ls.getItem('cart');
            if (storedCart) {
                setCartProducts(JSON.parse(storedCart));
            }
        }
    }, []);

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToRemove: number) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts
        })
        toast.success('Product removed')
    }


    function saveCartProductsToLocalStorage(cartProducts: any) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function addToCart(product: any, size: any = null, extras: any[] | undefined = []) {
        setCartProducts((prevProduct) => {
            const cartProducts = {...product, size, extras};
            const newProducts = [...prevProduct, cartProducts]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart}}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
