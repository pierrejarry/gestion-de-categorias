import { Product } from "../../types/types"
import './ProductItem.css'
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { ItemType } from "../category/CategoryItem";

function ProductItem({ product }: { product: Product }) {
  const { image, title, price } = product;
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
      <p className="title">{title}</p>
      <p className="price">{price} &euro;</p>
    </li>
  );
}

export default ProductItem