
import { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)


function CartContextProvider({ children }) {

    const [cart, setCart] = useState([])
    console.log(cart);
    
    function agregarAlCarrito(product, count) {
        if (isInCart(product.id)) { console.log("el cart ya existe");
            const actualizarCart = [...cart];
            actualizarCart.forEach((e) =>{
                if (e.item.id === product.id) {
                    e.quantity += count
                }
            })
            setCart(actualizarCart)
        } else {
             setCart([...cart, { item: product, quantity: count }])
            // esto dentro del array me copia uno por uno.. me mantiene mi listado y me pushea uno 
        }
    }

    const isInCart = (id) => {
        return cart.find(element => element.item.id === parseInt(id))
        
    }
    const clear = () => {
        setCart([])
    }
    const removeItem = (itemId) => {
        const cartFilter = cart.filter(element => element.item.id !== itemId )
        return setCart(cartFilter)
    }

    return (
        <CartContext.Provider value={{ cart, agregarAlCarrito, clear, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
