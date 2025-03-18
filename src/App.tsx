import CategoryItem from './components/category/CategoryItem';
import useCategories from './hooks/useCategories';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from './components/modal/Modal';
import { useProducts } from './context/productsContext';
import AddCategory from './components/category/AddCategory';
import './App.css'


function App() {
  const { categories } = useCategories();
  const { addProductPopup } = useProducts();

  const renderCategories = categories.map((cat, index) => <CategoryItem key={`category-${cat.name}-${index}`} category={cat} />);

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        {renderCategories}
        <AddCategory />
        {addProductPopup !== '' && <Modal />}
      </DndProvider>
    </main>
  )
}

export default App