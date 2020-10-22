import React from 'react';

export const BasketContext = React.createContext();

export const useBasketContext = () => {
    return React.useContext(BasketContext);
}
