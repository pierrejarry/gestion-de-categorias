import React, { useState, useRef } from "react";
import { Category } from "../../types/types"
import ProductItem from "../product/ProductItem";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Alignment } from "../../types/types";
import './CategoryItem.css'
import { useDrop } from "react-dnd";
import { useProducts } from "../../context/productsContext";
import { CirclePlus } from "lucide-react";

export const ItemType = 'PRODUCT';

function CategoryItem({ category }: { category: Category }) {
  const { name, products } = category;
  const { setCategories, setAddProductPopup } = useProducts();
  const [alignment, setAlignment] = useState<Alignment>('left');
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const dragOverIndexRef = useRef<number | null>(null);
  const iconSize = 16;

  /* Render List of products */
  const renderProducts = products.map((p, i) => (
    <React.Fragment key={`product-${p.title}-${i}`}>
      {dragOverIndex === i && (
        <li
          className="drop-indicator"
          style={{
            backgroundColor: '#222',
            width: '2px'
          }}
        ></li>
      )}
      <ProductItem product={p} name={name} />
    </React.Fragment>
  ));

  /* Dropping part*/
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { title: string }) => {
      const draggedTitle = item.title;
      const targetIndex = products.findIndex((p) => p.title === draggedTitle);

      if (targetIndex !== -1) {
        // Reorder the products array
        const updatedProducts = [...products];
        const [draggedProduct] = updatedProducts.splice(targetIndex, 1);
        updatedProducts.splice(dragOverIndexRef.current ?? updatedProducts.length, 0, draggedProduct);

        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.name === name ? { ...category, products: updatedProducts } : category
          )
        );
      }
      setDragOverIndex(null); // Reset the hover position after dropping
    },
    hover: (item: { title: string }, monitor) => {
      // Calculate the hover position horizontally
      const clientOffset = monitor.getClientOffset();
      if (clientOffset && ulRef.current) {
        const hoverBoundingRect = ulRef.current.getBoundingClientRect();
        const hoverX = clientOffset.x - hoverBoundingRect.left;

        // Find the index where the item would be inserted
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
  }));


  drop(ulRef);

  return (
    <article className="category">
      <div className="head">
        <h2>{name}</h2>
        <div className="buttons">
          Alignment:
          <button
            onClick={() => setAlignment('left')}
            title="Align Left"
            className={alignment === 'left' ? 'selected' : ''}
          >
            <AlignLeft size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment('center')}
            title="Align Center"
            className={alignment === 'center' ? 'selected' : ''}
          >
            <AlignCenter size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment('right')}
            title="Align Right"
            className={alignment === 'right' ? 'selected' : ''}
          >
            <AlignRight size={iconSize} />
          </button>
        </div>
      </div>
      <ul ref={ulRef} className={alignment}>
        {renderProducts}
        {products.length < 3 && 
          <li className="add-product">
            <button onClick={() => setAddProductPopup(name)}>
            <CirclePlus />
            Add product
            </button>
          </li>
        }
      </ul>
    </article>
  )
}

export default CategoryItem