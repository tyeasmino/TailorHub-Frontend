export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cartList: payload.dresses,
                total: payload.dresses.reduce((acc, dress) => {
                    // Make sure to coerce price to a number if it's a string
                    return acc + (parseFloat(dress.discount_price) || parseFloat(dress.base_price));
                }, 0)
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartList: payload.dresses,
                total: payload.dresses.reduce((acc, dress) => {
                    return acc + (parseFloat(dress.discount_price) || parseFloat(dress.base_price));
                }, 0)
            };

        case "CLEAR_FROM_CART":
            return { ...state, cartList: [], total: 0 };

        default:
            throw new Error("No case found!");
    }
};
