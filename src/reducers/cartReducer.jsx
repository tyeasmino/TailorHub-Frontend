export const cartReducer = (state, action) => {
    const { type, payload } = action;

    const calculateTotal = (cartList) => {
        return cartList.reduce((acc, dress) => {
            // Ensure price fields are properly parsed as numbers
            const price = parseFloat(dress.discount_price) || parseFloat(dress.base_price) || parseFloat(dress.purchase_price) || 0;
            return acc + (price * dress.quantity);
        }, 0);
    };
    
    


    switch (type) {
        case "SET_CART_LIST":
            return {
                ...state,
                cartList: payload.dresses,
                total: calculateTotal(payload.dresses),
            };


        // Inside the reducer
        case "ADD_TO_CART":
            console.log("Updated Cart List:", payload.dresses);  // Log cart list
            return {
                ...state,
                cartList: payload.dresses,
                total: calculateTotal(payload.dresses),
            };

        case "REMOVE_FROM_CART":
        case "UPDATE_CART":
            return {
                ...state,
                cartList: payload.dresses,
                total: calculateTotal(payload.dresses),
            };
        

        case "CLEAR_FROM_CART":
            return { ...state, cartList: [], total: 0 };


        default:
            throw new Error("No case found!");
    }
};
