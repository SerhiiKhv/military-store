'use client'

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

interface CartContextProps {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: any) => void;
    removeCartProduct: (indexToRemove: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const ls: Storage | null = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls !== null && ls.getItem('cart')) {
            const storedCart = ls.getItem('cart');
            if (storedCart) {
                setCartProducts(JSON.parse(storedCart));
            }
        }
    }, [ls]);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove: number) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Item removed');
    }

    function saveCartProductsToLocalStorage(cartProducts: any[]) {
        if (ls !== null) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product: any) {
        setCartProducts(prevProduct => {
            const newProducts = [...prevProduct, product];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}
