import { Product } from "../../types/types"
import './ProductItem.css'

function ProductItem({ product }: { product: Product }) {
  const { image, title, price } = product;
  return (
    <li className="product-item">
      <img src={image} alt={title} />
      <p className="title">{title}</p>
      <p className="price">{price} &euro;</p>
    </li>
  )
}

export default ProductItem