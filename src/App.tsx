import './App.css'
import useCategories from './hooks/useCategories'
import CategoryItem from './components/category/CategoryItem';

function App() {
  const { categories } = useCategories();

  const renderCategories = categories.map((cat, index) => <CategoryItem key={index} category={cat} />);

  return (
    <main>
      {renderCategories}
    </main>
  )
}

export default App
