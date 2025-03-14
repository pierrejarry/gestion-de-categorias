import { useState } from "react";
import { Category } from "../../types/types"
import ProductItem from "../product/ProductItem";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import './CategoryItem.css'

type Alignment = 'left' | 'center' | 'right';

function CategoryItem({ category }: { category: Category }) {
  const { name, products } = category;
  const [alignment, setAlignment] = useState<Alignment>('left');
  const iconSize = 16;
  const renderProducts = products.map((p, i) => <ProductItem product={p} key={i} />);

  return (
    <article className="category">
      <div className="head">
        <h2>{name}</h2>
        <div className="buttons">
          Alignment:
          <button
            onClick={() => setAlignment('left')}
            title="Align Left"
          >
            <AlignLeft size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment('center')}
            title="Align Center"
          >
            <AlignCenter size={iconSize} />
          </button>
          <button
            onClick={() => setAlignment('right')}
            title="Align Right"
          >
            <AlignRight size={iconSize} />
          </button>
        </div>
      </div>
      <ul className={alignment}>{renderProducts}</ul>
    </article>
  )
}

export default CategoryItem