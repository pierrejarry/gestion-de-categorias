import { useTransition, useState } from "react";
import { useProducts } from "../context/productsContext";

function useDeleteProduct() {
    const [isPending, startTransition] = useTransition();
    const [deleteProductError, setDeleteProductError] = useState<string | null>(null);
    const {setCategories} = useProducts();

    const removeProduct = (catName: string, productTitle: string) => {
        startTransition(async () => {
            setDeleteProductError(null);
            try {
                const response = await fetch(`/categories/${catName}/products/${productTitle}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const { categories: updatedCategories } = await response.json();
                setCategories(updatedCategories);
            } catch (error) {
                setDeleteProductError((error as Error).message);
            }
        });
    }

    return {
        removeProduct,
        isPending,
        deleteProductError
    }
}

export default useDeleteProduct