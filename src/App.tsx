import useCategories from './hooks/useCategories';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from './components/modal/Modal';
import { useProducts } from './context/productsContext';
import AddCategory from './components/category/AddCategory';
import SortableCategoryItem from './components/category/SortableCategoryItem';
import ZoomableGridEditor from './components/zoom/ZoomableGridEditor';
import './App.css'


function App() {
  const { categories, setCategories } = useCategories();
  const { addProductPopup } = useProducts();

  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      const [removed] = updatedCategories.splice(dragIndex, 1);
      updatedCategories.splice(hoverIndex, 0, removed);
      return updatedCategories;
    });
  };

  const renderCategories = categories.map((cat, index) =>
    <SortableCategoryItem
      key={`category-${cat.name}-${index}`}
      category={cat}
      index={index}
      moveCategory={moveCategory}
    />
  );

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <ZoomableGridEditor>
          {renderCategories}
          <AddCategory />
        </ZoomableGridEditor>
        {addProductPopup !== '' && <Modal />}
      </DndProvider>
    </main>
  )
}

export default App