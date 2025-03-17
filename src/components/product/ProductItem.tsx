import { Product } from "../../types/types"
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { ItemType } from "../category/CategoryItem";
import { Trash2 } from "lucide-react";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import './ProductItem.css'

interface ProductItemProps {
  product: Product;
  name: string
}

function ProductItem({ product, name }: ProductItemProps) {
  const { image, title, price } = product;
  const { removeProduct, isPending } = useDeleteProduct();

  const liRef = useRef<HTMLLIElement>(null);

  /* Dragging part */
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(liRef);

  return (
    <li
      ref={liRef}
      className="product-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <img src={image} alt={title} />
      <div className="text-container">
        <p className="title">{title}</p>
        <p className="price">{price} &euro;</p>
        <button
          className="remove-item"
          onClick={() => removeProduct(name, title)}
          title="Remove Item"
          disabled={isPending}
        >
          <Trash2 />
        </button>
      </div>
    </li >
  );
}

export default ProductItem