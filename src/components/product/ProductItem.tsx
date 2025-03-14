import { Product } from "../../types/types"

function ProductItem({ product }: { product: Product }) {
  const { image, title, price } = product;
  return (
    <li className="product-item">
      <img src={image} alt={title} />
      <p><strong>{title}</strong></p>
      <span>{price} &euro;</span>
    </li>
  )
}

export default ProductItem