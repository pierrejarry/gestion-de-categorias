
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Category } from "../types/types";

interface ProductsContextProps {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    addProductPopup: string;
    setAddProductPopup: Dispatch<SetStateAction<string>>;
}
export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [addProductPopup, setAddProductPopup] = useState('');
    return (
        <ProductsContext value={{ 
            categories, 
            setCategories,
            addProductPopup,
            setAddProductPopup
        }}>
            {children}
        </ProductsContext>
    )
}

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context)
        throw new Error('ProductsContext must be used within ProductsProvider');

    return context
}