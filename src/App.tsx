import './App.css'
import useCategories from './hooks/useCategories'
import CategoryItem from './components/category/CategoryItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const { categories } = useCategories();

  const renderCategories = categories.map((cat, index) => <CategoryItem key={`category-${cat.name}-${index}`} category={cat} />);

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        {renderCategories}
      </DndProvider>
    </main>
  )
}

export default App