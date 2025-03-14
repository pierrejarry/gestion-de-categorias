
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Category } from "../types/types";

interface ProductsContextProps {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
}
export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    return (
        <ProductsContext value={{ categories, setCategories}}>
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