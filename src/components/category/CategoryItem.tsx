import { Category } from "../../types/types"
import ProductItem from "../product/ProductItem";
import './CategoryItem.css'

function CategoryItem({ category }: { category: Category }) {
  const { name, products } = category;

  const renderProducts = products.map((p, i) => <ProductItem product={p} key={i} />);
  
  return (
    <article className="category">
      <h2>{name}</h2>
      <ul>{renderProducts}</ul>
    </article>
  )
}

export default CategoryItem