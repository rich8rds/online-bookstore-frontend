import { createContext, useEffect, useReducer, useState } from "react";
import { favoriteProducts } from "../products";
import { controls, controlsReducer } from "../reducer/controlsReducer";

const ProductsContext = createContext()

const ProductProvider = ({ children }) => {
    const[products, setProducts] = useState([])
    const[state, dispatch] = useReducer(controlsReducer, controls)

    useEffect(() => {
        setProducts(favoriteProducts)
    }, [])

    return( 
        <ProductsContext.Provider value={{products, setProducts, state, dispatch}}>
            { children }
        </ProductsContext.Provider>
    )
}

export { ProductsContext, ProductProvider }