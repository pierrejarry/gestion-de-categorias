import { useState } from "react";
import useAddCategory from "../../hooks/useAddCategory";
import './AddCategory.css'

function AddCategory() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const { addCategory } = useAddCategory();

    const newCat = {
        name: newCategoryName,
        products: []
    }

    return (
        <form action={() => addCategory(newCat)} className="add-category">
            <h3>Add a new category</h3>
            <input
                type='text'
                placeholder='Category name'
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
                type='submit'
                className="primary"
            >Add</button>
        </form>
    )
}

export default AddCategory