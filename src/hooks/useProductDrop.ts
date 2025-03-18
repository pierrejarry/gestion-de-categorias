import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Product } from "../types/types";

interface UseProductDropReturn {
  ulRef: React.RefObject<HTMLUListElement | null>;
  dragOverIndex: number | null;
}

export const ItemType = 'PRODUCT';

function useProductDrop(
  products: Product[],
  onReorder: (updatedProducts: Product[]) => void
): UseProductDropReturn {
  const ulRef = useRef<HTMLUListElement>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOverIndexRef = useRef<number | null>(null);

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { title: string }) => {
      // Find the product being dragged by its title
      const draggedTitle = item.title;
      const targetIndex = products.findIndex(p => p.title === draggedTitle);

      if (targetIndex !== -1) {
        const updatedProducts = [...products];
        const [draggedProduct] = updatedProducts.splice(targetIndex, 1);
        updatedProducts.splice(
          dragOverIndexRef.current ?? updatedProducts.length,
          0,
          draggedProduct
        );
        onReorder(updatedProducts);
      }
      setDragOverIndex(null);
    },
    hover: (item: { title: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset && ulRef.current) {
        const hoverBoundingRect = ulRef.current.getBoundingClientRect();
        const hoverX = clientOffset.x - hoverBoundingRect.left;

        let newIndex = 0;
        for (let i = 0; i < ulRef.current.children.length; i++) {
          const itemElement = ulRef.current.children[i];
          const itemRect = itemElement.getBoundingClientRect();
          const itemMiddleX = itemRect.left + itemRect.width / 2;
          if (hoverX < itemMiddleX) {
            newIndex = i;
            break;
          }
          newIndex = i + 1;
        }
        dragOverIndexRef.current = newIndex;
        setDragOverIndex(newIndex);
      }
    }
  }), [products, onReorder]);

  useEffect(() => {
    if (ulRef.current) {
      drop(ulRef);
    }
  }, [drop]);

  return { ulRef, dragOverIndex };
}

export default useProductDrop;
