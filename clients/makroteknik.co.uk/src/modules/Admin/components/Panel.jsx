import { useState } from "react"
import { useProductStore } from "../../Products/stores/ProductStore"

export const Panel = () => {
    // Stores
    const productsList = useProductStore((s) => s.productsList)
    const addProduct = useProductStore((s) => s.addProduct)
    const updateProduct = useProductStore((s) => s.updateProduct)
    const deleteProduct = useProductStore((s) => s.deleteProduct)

    // State to hold the current product being edited or created
    const [currentProduct, setCurrentProduct] = useState({
        _id: null,
        title: "",
        categoryId: 0,
        imageUrl: "",
        productCode: "",
        sizeToPrice: [],
        description: "",
    })

    // State to control whether the form is visible for editing/adding
    const [isEditing, setIsEditing] = useState(false)

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentProduct({ ...currentProduct, [name]: value })
    }

    // Handle saving the product (either update or add)
    const handleSaveProduct = () => {
        if (currentProduct._id) {
            updateProduct(currentProduct)
        } else {
            addProduct(currentProduct)
        }
        // Reset form and state after saving
        setIsEditing(false)
        setCurrentProduct({
            _id: null,
            title: "",
            categoryId: 0,
            imageUrl: "",
            productCode: "",
            sizeToPrice: [],
            description: "",
        })
    }

    // Handle editing a product
    const handleEditProduct = (product) => {
        setCurrentProduct(product)
        setIsEditing(true)
    }

    // Handle deleting a product
    const handleDeleteProduct = (id) => {
        deleteProduct(id)
    }

    return (
        <div className="gap-8 flex flex-col">
            {/* List of products */}
            {productsList.map((v) => (
                <div
                    key={v._id}
                    className="w-full bg-green-200 h-fit rounded-md p-4"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3>{v.title}</h3>
                            <p>{v.productCode}</p>
                            <p>{v.description}</p>
                            {/* Show size and price information */}
                            <ul>
                                {v.sizeToPrice.map((size, idx) => (
                                    <li key={idx}>{`${Object.keys(size)[0]} - ${
                                        Object.values(size)[0]
                                    }`}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2">
                            {/* Edit and Delete buttons */}
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => handleEditProduct(v)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => handleDeleteProduct(v._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Form for adding/updating a product */}
            {isEditing && (
                <div className="bg-gray-100 p-4 rounded-md">
                    <h3>
                        {currentProduct._id
                            ? "Edit Product"
                            : "Add New Product"}
                    </h3>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="title"
                            value={currentProduct.title}
                            onChange={handleInputChange}
                            placeholder="Product Title"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="productCode"
                            value={currentProduct.productCode}
                            onChange={handleInputChange}
                            placeholder="Product Code"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={currentProduct.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="border p-2 rounded"
                        />
                        <textarea
                            name="description"
                            value={currentProduct.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            className="border p-2 rounded"
                        />
                        {/* Buttons to save or cancel */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleSaveProduct}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Add new product button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                    setIsEditing(true)
                    setCurrentProduct({
                        _id: null,
                        title: "",
                        categoryId: 0,
                        imageUrl: "",
                        productCode: "",
                        sizeToPrice: [],
                        description: "",
                    })
                }}
            >
                Add New Product
            </button>
        </div>
    )
}
