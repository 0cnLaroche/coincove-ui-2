import React from 'react';

export const ItemContext = React.createContext();

export const useItemContext = () => {
    return React.useContext(ItemContext);
}
