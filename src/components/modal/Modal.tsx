import { useState } from "react";
import { useProducts } from "../../context/productsContext";
import { X } from "lucide-react";
import { Product } from "../../types/types";
import useAddProduct from "../../hooks/useAddProduct";
import "./Modal.css";

function Modal() {
    const { addProductPopup, setAddProductPopup } = useProducts();
    const { addProduct } = useAddProduct();
    const [newProduct, setNewProduct] = useState<Product>({
        image: '',
        title: '',
        price: ''
    });

    const closeModal = () => setAddProductPopup('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const imageUrl = file ? URL.createObjectURL(file) : '';
        setNewProduct((prev) => ({
            ...prev,
            image: imageUrl
        }));
    };

    return (
        <>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="modal">
                <header className="modal-header">
                    <h2>Add New Product</h2>
                    <button type="button" className="close-icon" onClick={closeModal}>
                        <X />
                    </button>
                </header>

                <form action={() => addProduct(addProductPopup, newProduct)}>
                    <fieldset>
                        {/* Image Upload */}
                        <div className="input-group file-input">
                            <label htmlFor="file-input">Product Image</label>
                            <input
                                id="file-input"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Title Input */}
                        <div className="input-group">
                            <label htmlFor="title-input">Title</label>
                            <input
                                type="text"
                                id="title-input"
                                name="title"
                                placeholder="Enter product title"
                                value={newProduct.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price Input */}
                        <div className="input-group">
                            <label htmlFor="price-input">Price (€)</label>
                            <input
                                type="number"
                                id="price-input"
                                name="price"
                                placeholder="Enter price"
                                value={newProduct.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </fieldset>

                    <footer className="modal-footer">
                        <button type="button" className="secondary" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="primary">
                            Add Product
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}

export default Modal;
