import { useEffect, useState, useTransition } from "react"
import { Category } from "../types/types";
import { workerStartPromise } from "../main";

function useCategories() {
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<Category[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

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