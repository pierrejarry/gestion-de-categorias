import './App.css'
import useCategories from './hooks/useCategories'

function App() {
  const { categories } = useCategories();

  const renderCategories = categories.map((cat, index) => <div key={index}>{cat.name}</div>);

  return (
    <main>
      {renderCategories}
    </main>
  )
}

export default App
