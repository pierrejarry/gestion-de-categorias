import { Product } from "../types/types"
import { useTransition, useState } from "react";
import { useProducts } from "../context/productsContext";

function useAddProduct() {
    const { setCategories, setAddProductPopup } = useProducts();
    const [isPending, startTransition] = useTransition();
    const [addProductError, setAddProductError] = useState<string | null>(null);

    const addProduct = (productName: string, product: Product) => {
        startTransition(async () => {
            setAddProductError(null);
            try {
                const response = await fetch(`/categories/${productName}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const { categories: updatedCategories } = await response.json();
                setCategories(updatedCategories);
                setAddProductPopup('');
            } catch (error) {
                setAddProductError((error as Error).message);
            }
        });
    }

    return {
        addProduct,
        isPending,
        addProductError
    }
}

export default useAddProduct