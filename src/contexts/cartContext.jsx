import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";

// Default cart initial state
const cartInitialState = {
    cartList: [],
    total: 0
};

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    // Load cart data from localStorage on initial render (page load)
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartList')) || [];
        const savedTotal = JSON.parse(localStorage.getItem('total')) || 0;

        // If there's saved data, update the state
        if (savedCart.length > 0) {
            dispatch({
                type: "SET_CART_LIST",
                payload: { dresses: savedCart, total: savedTotal }
            });
        }
    }, []);

    // Save cartList and total to localStorage whenever they change
    useEffect(() => {
        if (state.cartList.length > 0) {
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
            localStorage.setItem('total', JSON.stringify(state.total));
        }
    }, [state.cartList, state.total]);

    // Add item to cart
    const addToCart = (dress) => {
        const updatedList = [...state.cartList, { ...dress, quantity: 1, selected: false }];
        dispatch({
            type: "ADD_TO_CART",
            payload: { dresses: updatedList }
        });
    };

    // Remove item from cart
    const removeFromCart = (dress) => {
        const updatedList = state.cartList.filter(item => item.id !== dress.id);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { dresses: updatedList }
        });
    };

    // Clear cart
    const clearFromCart = () => {
        dispatch({
            type: "CLEAR_FROM_CART",
            payload: { dresses: [], total: 0 }
        });
        localStorage.removeItem('cartList');
        localStorage.removeItem('total');
    };

    // Increment item quantity in cart
    const incrementQuantity = (dressId, stockQuantity) => {
        const updatedList = state.cartList.map(item => {
            if (item.id === dressId) {
                return { ...item, quantity: Math.min(item.quantity + 1, stockQuantity) };
            }
            return item;
        });
        dispatch({
            type: "UPDATE_CART",
            payload: { dresses: updatedList }
        });
    };

    // Decrement item quantity in cart
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

    // Select or deselect an item in the cart
    const toggleSelectDress = (dressId) => {
        const updatedList = state.cartList.map(item => {
            if (item.id === dressId) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        dispatch({
            type: "UPDATE_CART",
            payload: { dresses: updatedList }
        });
    };

    // Select all items in the cart
    const selectAllDresses = () => {
        const updatedList = state.cartList.map(item => {
            return { ...item, selected: true };
        });
        dispatch({
            type: "UPDATE_CART",
            payload: { dresses: updatedList }
        });
    };

    // Deselect all items in the cart
    const deselectAllDresses = () => {
        const updatedList = state.cartList.map(item => {
            return { ...item, selected: false };
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
        decrementQuantity,
        toggleSelectDress,
        selectAllDresses,
        deselectAllDresses
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};
