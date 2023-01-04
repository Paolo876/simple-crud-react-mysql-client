import { configureStore } from '@reduxjs/toolkit'; 

const store = configureStore({
    reducer: {  
        // productList: productsSlice.reducer,
        // cart: cartSlice.reducer,
        // user: userSlice.reducer,
        // order: orderSlice.reducer,
    }
});

export default store;