import { useProducts } from "../context/productsContext";
import { useState, useTransition } from "react";
import { Category } from "../types/types";

function useAddCategory() {
    const { setCategories } = useProducts();
    const [isPending, startTransition] = useTransition();
    const [addCategoryError, setAddCategoryError] = useState<string | null>(null);

    const addCategory = (category: Category) => {
        startTransition(async () => {
            setAddCategoryError(null);
            try {
                const response = await fetch(`/categories`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(category)
                });
    
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
    
                const data = await response.json();
    
                // Ensure data.categories exists and extract the newly added category
                const updatedCategories: Category[] = data.categories;
                const newCategory = updatedCategories.find(cat => cat.name === category.name);
    
                if (!newCategory) {
                    throw new Error("Failed to retrieve new category from response.");
                }
    
                setCategories(prevCategories => [
                    ...prevCategories,
                    newCategory
                ]);
            } catch (error) {
                setAddCategoryError((error as Error).message);
            }
        });
    }    

    return {
        addCategory,
        isPending,
        addCategoryError
    }
}

export default useAddCategory