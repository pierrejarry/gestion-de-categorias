import { useEffect, useState, useTransition } from "react"
import { workerStartPromise } from "../main";
import { useProducts } from "../context/productsContext";

function useCategories() {
    const [isPending, startTransition] = useTransition();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const { categories, setCategories } = useProducts();

    useEffect(() => {
        const fetchCategories = () => {
            startTransition(async () => {
                setFetchError(null);
                try {
                    const response = await fetch('/categories');

                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }

                    const data = await response.json();
                    setCategories(data.categories);
                } catch (error) {
                    setFetchError((error as Error).message);
                }
            });
        }

        workerStartPromise?.then(
            () => fetchCategories()
        );
    }, []);

    return {
        isPending,
        categories,
        fetchError
    }
}

export default useCategories