import React, { useState } from "react";
import { Category } from "../../types/types"
import ProductItem from "../product/ProductItem";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import useProductDrop from "../../hooks/useProductDrop";
import { useProducts } from "../../context/productsContext";
import { CirclePlus } from "lucide-react";
import './CategoryItem.css'

function CategoryItem({ category }: { category: Category }) {
  const { name, products } = category;
  const { setCategories, setAddProductPopup } = useProducts();
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const iconSize = 16;

  // Use our custom hook to manage drag & drop
  const { ulRef, dragOverIndex } = useProductDrop(products, (updatedProducts) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.name === name ? { ...cat, products: updatedProducts } : cat
      )
    );
  });

  // Render the list of products with an optional drop indicator
  const renderProducts = products.map((p, i) => (
    <React.Fragment key={`product-${p.title}-${i}`}>
      {dragOverIndex === i && (
        <li
          className="drop-indicator"
          style={{ backgroundColor: "#222", width: "2px" }}
        />
      )}
      <ProductItem product={p} name={name} />
    </React.Fragment>
  ));

  return (
    <>
      <div className="head">
        <h2>{name}</h2>
        <div className="buttons">
          Alignment:
          <button
            onClick={() => setAlignment("left")}
            title="Align Left"
            className={alignment === "left" ? "selected" : ""}
          >
            <AlignLeft size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment("center")}
            title="Align Center"
            className={alignment === "center" ? "selected" : ""}
          >
            <AlignCenter size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment("right")}
            title="Align Right"
            className={alignment === "right" ? "selected" : ""}
          >
            <AlignRight size={iconSize} />
          </button>
        </div>
      </div>
      <ul ref={ulRef} className={alignment}>
        {renderProducts}
        {products.length < 3 && (
          <li className="add-product">
            <button onClick={() => setAddProductPopup(name)} className="secondary">
              <CirclePlus />
              Add product
            </button>
          </li>
        )}
      </ul>
    </>
  );
}

export default CategoryItem