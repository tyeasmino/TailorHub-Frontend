import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const cartInitialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);


    const addToCart = (dress) => {
        const updatedList = [...state.cartList, { ...dress, quantity: 1 }];
        dispatch({
            type: "ADD_TO_CART",
            payload: { dresses: updatedList }
        });
    };

    const removeFromCart = (dress) => {
        const updatedList = state.cartList.filter(item => item.id !== dress.id);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { dresses: updatedList }
        });
    };

    const clearFromCart = () => {
        dispatch({
            type: "CLEAR_FROM_CART",
            payload: { dresses: [], total: 0 }
        });
    };

    const incrementQuantity = (dressId, stockQuantity) => {
        const updatedList = state.cartList.map(item => {
            if (item.id === dressId) {
                // Ensure quantity does not exceed stock quantity
                return { ...item, quantity: Math.min(item.quantity + 1, stockQuantity) };
            }
            return item;
        });

        dispatch({
            type: "UPDATE_CART",
            payload: { dresses: updatedList }
        });
    };

    const decrementQuantity = (dressId) => {
        const updatedList = state.cartList.map(item => {
            if (item.id === dressId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        dispatch({
            type: "UPDATE_CART",
            payload: { dresses: updatedList }
        });
    };

    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearFromCart,
        incrementQuantity,
        decrementQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}


export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}